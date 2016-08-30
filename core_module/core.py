#!/usr/bin/python
import threading
import sys
import time
import os
import logging
from fsm import FSM
from fuzzy_recognizer import FuzzyRecognizer
from sense_extraction import SenseExtractor
from arius_searcher import ESearchClient
sys.path.append("../")
from client import RESTClient
from config import config


class Updater(threading.Thread):
    def __init__(self, lock, debug=False):
        threading.Thread.__init__(self)
        self._lock = lock
        self._debug = debug
        self._connection = RESTClient(config["core_server_input_address"],
                                      config["core_server_input_port"],
                                      config["core_server_input_url"])
        self.input_speech = None

    def run(self):
        while True:
            if not self.input_speech:
                command = self._connection.GET_request(True, 0)
                if command['speech_text'] != 'no updates':
                    logger.debug('RECEIVED COMMAND')
                    self._lock.acquire()
                    self.input_speech = command['speech_text']
                    self._lock.release()

            time.sleep(config['core_update_interval'])


class Core(threading.Thread):
    def __init__(self, verbose=False):
        threading.Thread.__init__(self)
        self._verbose = verbose
        self._lock = threading.RLock()
        self._updater = Updater(self._lock)

        self._result_sender = RESTClient(config["core_server_output_address"],
                                         config["core_server_output_port"],
                                         config["core_server_output_url"])

        self._ESclient = ESearchClient()
        self._sense_extractor = SenseExtractor('stop.txt')
        self._command_recognizer = FuzzyRecognizer(config['core_commands'], min_confidence=config['core_command_recog_confidence'], verbose=self._verbose)
        self._video_recognizer = FuzzyRecognizer(config['predefined_videos'], min_confidence=config['core_command_recog_confidence'], verbose=self._verbose)
        states_dict = {}
        states_dict['idle'] = [('cancel', None, 'idle'), ('request', None, 'searching_data'), ('display_video', None, 'displaying_video')]
        states_dict['searching_data'] = [('cancel', None, 'idle'), ('display', None, 'displaying_data'), ('not_found', None, 'search_data_failed')]
        states_dict['search_data_failed'] = [('cancel', None, 'idle'), ('request', None, 'searching_data')]
        states_dict['displaying_data'] = [('cancel', None, 'idle'), ('command', None, 'displaying_data'), ('request', None, 'searching_data')]
        states_dict['displaying_video'] = [('cancel', None, 'idle'), ('command', None, 'displaying_video'), ('request', None, 'searching_data')]
        self._statemachine = FSM('idle', states_dict, 'idle', verbose=self._verbose)

    def run(self):
        self._updater.start()
        # initially, open idle screen
        self._send_command({'type': 'OPEN_SCREEN', 'command': 'IDLE'})
        while True:
            if self._updater.input_speech:
                user_input = self._updater.input_speech
                logger.debug(user_input)
                self._lock.acquire()
                self._updater.input_speech = None
                self._lock.release()

                recognized_command = self._command_recognizer.recognize_command(user_input)
                if recognized_command:
                    if recognized_command == 'CANCEL':
                        self._handle_command(recognized_command)
                        continue
                    if self._statemachine.get_state() == 'displaying_data':
                        if recognized_command in ['ZOOM_IN', 'ZOOM_OUT', 'SCROLL_DOWN', 'SCROLL_UP']:
                            self._handle_command(recognized_command)
                            continue
                if (self._statemachine.get_state() == 'idle' and recognized_command == 'START' ) \
                        or self._statemachine.get_state() != 'idle':
                    user_input = self._command_recognizer.remove_command(user_input, 'START')
                    query = ' '.join(self._sense_extractor.get_keywords(user_input))
                    recognized_video = self._video_recognizer.recognize_command(query)
                    if recognized_video:
                        self._handle_command('OPEN_VIDEO', recognized_video)
                    elif query:
                        logger.info('Proceeding search query...')
                        self._do_work(self._find_data, query)
                    else:
                        logger.info('Search query is empty')
            time.sleep(config['core_update_interval'])

    def _handle_command(self, command, arg=None):
        if command == "CANCEL":
            self._statemachine.handle_message('cancel')
            request = {'type': 'OPEN_SCREEN', 'command': 'IDLE'}
            self._send_command({'type': 'SPEAK', 'command': 'Operation cancelled'})
        elif command == "ZOOM_IN":
            request = {'type': 'ZOOM_IN', 'command': ''}
            self._send_command({'type': 'SPEAK', 'command': 'Enlarging'})
        elif command == "ZOOM_OUT":
            request = {'type': 'ZOOM_OUT', 'command': ''}
            self._send_command({'type': 'SPEAK', 'command': 'Zooming out'})
        elif command == "SCROLL_DOWN":
            request = {'type': 'SCROLL_DOWN', 'command': ''}
            self._send_command({'type': 'SPEAK', 'command': 'Down'})
        elif command == "SCROLL_UP":
            request = {'type': 'SCROLL_UP', 'command': ''}
            self._send_command({'type': 'SPEAK', 'command': 'Up'})
        elif command == "SEARCH":
            request = {'type': 'OPEN_SCREEN', 'command': 'SEARCH'}
            self._statemachine.handle_message('request')
            self._send_command({'type': 'SPEAK', 'command': 'Search request accepted, my lord'})
        elif command == "OPEN_VIDEO":
            request = {'type': 'OPEN_VIDEO', 'command': arg}
            self._statemachine.handle_message('display_video')
            self._send_command({'type': 'SPEAK', 'command': 'Search request accepted, my lord'})
        self._send_command(request)

    def _find_data(self, request, result):
        self._handle_command('SEARCH')
        logger.info('Searching data...')
        data = self._ESclient.search(request)
        logger.debug(data)
        if data:
            # get the most relevant result in sorted list of results
            fname = data[0][0]
            base, file_ext = os.path.splitext(fname)
            logger.info('File extension:')

            if file_ext == '.pdf':
                data = {'type': 'OPEN_PDF', 'command': fname}
            elif file_ext == '.html':
                data = {'type': 'OPEN_LOCAL_PAGE', 'command': fname}
            elif file_ext == '.url':
                link = open(fname).read()
                data = {'type': 'OPEN_URL', 'command': link}
            self._statemachine.handle_message('display')
        else:
            data = {'type': 'OPEN_SCREEN', 'command': 'ERROR'}
            self._statemachine.handle_message('not_found')
        result.append(data)
        return None

    def _do_work(self, function, argument):

        result = []
        logger.info(argument)
        worker = threading.Thread(target=function, args=(argument, result))
        worker.start()
        while not (self._updater.input_speech is not None or result):
            pass
        if result:
            self._send_command(result[0])
            result = None
            return None
        else:
            logger.info('Cancelled')
            return None

    def _send_command(self, command):
        logger.info('Send command to Output module: %s', command)
        self._result_sender.send_data_in_POST(command)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--debug', action='store_true', dest='en_debug', help='Enables debug mode and extra messages'
                        ' - detailed ouput of received commands, proceeding and sent messages.')
    parser.add_argument('-v', '--verbose', action='store_true', dest='en_verbose', help='Enables verbose mode - shows basic info: states of statemachine,'
                        ' received messages and sent commands.')
    args = parser.parse_args()

    logging.getLogger("urllib3").setLevel(logging.CRITICAL)
    logging.getLogger("elasticsearch").setLevel(logging.CRITICAL)
    logging.getLogger("elasticsearch.trace").setLevel(logging.CRITICAL)

    logger = logging.getLogger("Core")
    logger.propagate = False
    ch = logging.StreamHandler()
    if args.en_verbose:
        logging.basicConfig(level=logging.INFO)
    elif args.en_debug:
        logging.basicConfig(level=logging.DEBUG)
    else:
        logging.basicConfig(level=logging.CRITICAL)
    formatter = logging.Formatter("[%(name)s][%(asctime)s][%(levelname)s] - %(message)s")
    ch.setFormatter(formatter)
    logger.addHandler(ch)

    core = Core(verbose=args.en_verbose)
    core.start()
