import threading
import sys
import time
import os
from fuzzywuzzy import fuzz
from statemachine import statemachine
sys.path.append("../")
from client import RESTClient
from sense_extraction import SenseExtractor
from arius_searcher import ESearchClient
from config import config
TAG = "[Core]"


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
                    if self._debug:
                        print '==================================================='
                        print TAG, 'RECEIVED COMMAND'
                    self._lock.acquire()
                    self.input_speech = command['speech_text']
                    self.new_input = True
                    self._lock.release()

            time.sleep(.1)


class Core(threading.Thread):
    def __init__(self, debug=False, verbose=False):
        threading.Thread.__init__(self)
        self._debug = debug
        self._verbose = verbose
        self._lock = threading.RLock()
        self._statemachine = statemachine
        ()
        self._updater = Updater(self._lock)

        self._result_sender = RESTClient(config["core_server_output_address"],
                                         config["core_server_output_port"],
                                         config["core_server_output_url"])

        self._ESclient = ESearchClient()
        self._sense_extractor = SenseExtractor('stop.txt')

        self._command_confidence = float(config['core_command_recog_confidence']) * 100
        self._start_phrases = ['ok arius', 'what is that', 'what the fuck']
        self._commands = {
            "ZOOM_IN": ['zoom in', 'increase', 'enlarge', 'zoom more'],
            "ZOOM_OUT": ['shrink', 'decrease', 'zoom less', 'zoom out'],
            "NO_ZOOM": ['normal size', 'zero zoom', 'no zoom', 'zoom reset', 'reset zoom'],
            "SCROLL_DOWN": ['page down', 'scroll down'],
            "SCROLL_UP": ['page up', 'scroll up'],
            "CANCEL": ['cancel', 'bye', 'thanks'],
            "WAIT": ['wait']
        }

        self._commnad = None

    def run(self):
        self._updater.start()
        data = {'type': 'OPEN_SCREEN', 'command': 'IDLE'}
        self._send_command(data)
        while True:
            if self._updater.input_speech:
                if self._verbose:
                    print TAG, 'state in the beginning is {}'.format(self._statemachine.get_state())
                user_input = self._updater.input_speech
                self._lock.acquire()
                self._updater.input_speech = None
                self._updater.new_input = False
                self._lock.release()

                if self._recognize_command(user_input) == 'CANCEL':
                    self._statemachine.handle_message('cancel')
                    request = {'type': 'OPEN_SCREEN', 'command': 'IDLE'}
                    self._send_command({'type': 'SPEAK', 'command': 'Operation cancelled'})
                    self._send_command(request)
                    continue
                if self._statemachine.get_state() == 'displaying_data':
                    if self._recognize_command(user_input) == 'ZOOM_IN':
                        request = {'type': 'ZOOM_IN', 'command': ''}
                        self._send_command({'type': 'SPEAK', 'command': 'Enlarging'})
                        self._send_command(request)
                        continue
                    elif self._recognize_command(user_input) == 'ZOOM_OUT':
                        request = {'type': 'ZOOM_OUT', 'command': ''}
                        self._send_command({'type': 'SPEAK', 'command': 'Zooming out'})
                        self._send_command(request)
                        continue
                    elif self._recognize_command(user_input) == 'SCROLL_DOWN':
                        request = {'type': 'SCROLL_DOWN', 'command': ''}
                        self._send_command({'type': 'SPEAK', 'command': 'Scrolling down, sir'})
                        self._send_command(request)
                        continue
                    elif self._recognize_command(user_input) == 'SCROLL_UP':
                        request = {'type': 'SCROLL_UP', 'command': ''}
                        self._send_command({'type': 'SPEAK', 'command': 'Scrolling up as you wish'})
                        self._send_command(request)
                        continue

                if (self._statemachine.get_state() == 'idle' and self._recognize_start_phrase_and_get_input(user_input)) \
                        or self._statemachine.get_state() != 'idle':

                    user_input = self._recognize_start_phrase_and_get_input(user_input)

                    query = ' '.join(self._sense_extractor.get_context(user_input))
                    if self._verbose:
                        print TAG, 'Proceeding search query...'
                    if query:
                        self._statemachine.handle_message('request')
                        self._send_command({'type': 'SPEAK', 'command': 'Search request accepted, my lord'})
                        self._do_work(self._find_data, query)
                    else:
                        if self._verbose:
                            print TAG, 'search query is empty'
                if self._verbose:
                    print TAG, 'state in the end is {}'.format(self._statemachine.get_state())

            else:
                pass
                # print 'no commands'
            time.sleep(.1)

    def _recognize_command(self, data):
        command_probability = {key: 0 for key in self._commands.keys()}

        for command_key in self._commands.keys():
            for command in self._commands[command_key]:

                c_probability = fuzz.partial_ratio(command, data)

                if c_probability > command_probability[command_key]:
                    command_probability[command_key] = c_probability

        if max(command_probability):
            if self._debug:
                print '<============== COMMAND RECOGNIZING START ===============>'
                print self._command_confidence
                print 'Available commands are {}\n'.format(self._commands.keys())
                print 'Predicted possibility of each command is {}\n'.format(command_probability)
                print 'Maximal possibility is {}\n'.format(max(command_probability))
            result = [key for key in command_probability.keys() if command_probability[key] == max(command_probability.values()) and command_probability[key] > self._command_confidence]
            if self._debug:
                print 'These commands are equally possible {}'.format(result)
            if result:
                if self._debug:
                    print 'Recognized command is {}'.format(result[0])
                    print '>++++++++++++ COMMAND RECOGNIZING END ++++++++++++<\n\n'
                return result[0]
            if self._debug:
                print 'Command not recognized'
                print '>++++++++++++ COMMAND RECOGNIZING END ++++++++++++<\n\n'
            return None

    def _recognize_start_phrase_and_get_input(self, data):
        """
        This function gets an input argument
        """
        if self._debug:
            print '<============== START PHRASE RECOGNIZING BEGAN ===============>'
        for start in self._start_phrases:
            if self._debug:
                print 'Recognizer confidence for phrase {} is {}'.format(start, fuzz.partial_ratio(start, data))
            if fuzz.partial_ratio(start, data) > self._command_confidence:
                if self._debug:
                    print 'Start phrase succesfully recognized. It was following one: {}'.format(start)
                    print 'Recognizer confidence was {}'.format(fuzz.partial_ratio(start, data))
                    print '>++++++++++++ START PHRASE RECOGNIZING END ++++++++++++<\n\n'
                data = self._fuzzy_replace(data, start, '')
                return data
        if self._debug:
            print 'Start phrase was not recognized'
            print '>++++++++++++ START PHRASE RECOGNIZING END ++++++++++++<\n\n'
        return None

    def _fuzzy_replace(self, string, str_a, str_b):
        N = len(str_a.split())
        pre_grams = string.split()
        grams = [' '.join(pre_grams[i:i + N]) for i in xrange(len(pre_grams) - N)]
        for gram in grams:
            if fuzz.partial_ratio(gram, string) > .85:
                string = string.replace(gram, '')
                string = string.strip()
                if self._debug:
                    print 'User input without a start phrase is: "{}"'.format(string)
                return string
        if self._debug:
            print 'Nothing to replace'
        return string

    def _find_data(self, request, result):
        if self._verbose:
            print TAG, 'Searching data...'
        data = {'type': 'OPEN_SCREEN', 'command': 'SEARCH'}
        self._send_command(data)
        data = self._ESclient.search(request)
        time.sleep(.7)
        if self._verbose:
            print TAG, 'Opening search screen.'
            print TAG, data
        if data:
            fname = data[0][0]
            base, file_ext = os.path.splitext(fname)
            if self._verbose:
                print TAG, 'File extension:', file_ext
            if file_ext == '.pdf':
                data = {'type': 'OPEN_PDF', 'command': fname}
                self._statemachine.handle_message('found')
            elif file_ext == '.html':
                data = {'type': 'OPEN_LOCAL_PAGE', 'command': fname}
                self._statemachine.handle_message('found')
            elif file_ext == '.url':
                data = open(fname)
                link = data.readlines()[0]
                if self._verbose:
                    print TAG, link
                data = {'type': 'OPEN_URL', 'command': link}
                self._statemachine.handle_message('found')

        else:
            data = {'type': 'OPEN_SCREEN', 'command': 'ERROR'}
            self._statemachine.handle_message('not_found')
        result.append(data)
        return None

    def _do_work(self, function, argument):
        result = []
        if self._verbose:
            print TAG, argument
        worker = threading.Thread(target=function, args=(argument, result))
        worker.start()
        while not (self._updater.new_input or result):
            pass
        if result:
            self._send_command(result[0])
            result = None
            return None
        else:
            if self._verbose:
                print TAG, 'Cancelled'
            return None

    def _send_command(self, command):
        if self._verbose:
            print TAG, 'Send command to Output module: ', command
        self._result_sender.send_data_in_POST(command)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--debug', action='store_true', dest='en_debug', help='Enables debug mode and extra messages'
                        ' - detailed ouput of received commands, proceeding and sent messages.')
    parser.add_argument('-v', '--verbose', action='store_true', dest='en_verbose', help='Enables verbose mode - shows basic info: states of statemachine,'
                        ' received messages and sent commands.')
    args = parser.parse_args()
    core = Core(debug=args.en_debug, verbose=args.en_verbose)
    core.start()
