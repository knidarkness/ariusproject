import threading
import sys
import time
import functools
import thread
from statemachine import statemachine
sys.path.append("../")
from client import RESTClient
from sense_extraction import SenseExtractor
from arius_searcher import ESearchClient
from configure import ConstExtractor


class Updater(threading.Thread):
    def __init__(self, lock):
        threading.Thread.__init__(self)
        self._lock = lock
        self._settings = ConstExtractor()
        self._connection = RESTClient(self._settings.getValue("core_server_input_address"),
                                      self._settings.getValue("core_server_input_port"),
                                      self._settings.getValue("core_server_input_url"))
        self.input_speech = None

    def run(self):
        while True:
            if not self.input_speech:
                command = self._connection.GET_request(True, 0)
                if command['speech_text'] != 'no updates':
                    print 'RECEIVED COMMAND'
                    self._lock.acquire()
                    self.input_speech = command['speech_text']
                    self.new_input = True
                    self._lock.release()

            time.sleep(.1)


class Core(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self._lock = threading.RLock()
        self._statemachine = statemachine
        self._settings = ConstExtractor()
        self._updater = Updater(self._lock)

        self._result_sender = RESTClient(self._settings.getValue("core_server_output_address"),
                                         self._settings.getValue("core_server_output_port"),
                                         self._settings.getValue("core_server_output_url"))

        self._ESclient = ESearchClient()
        self._sense_extractor = SenseExtractor('stop.txt')

        self._start_phrases = ['ok arius', 'what is that', 'what the fuck']
        self._commands = {
            "ZOOM_IN": ['zoom in', 'increase', 'enlarge', 'zoom more'],
            "ZOOM_OUT": ['shrink', 'decrease', 'zoom less', 'zoom out'],
            "NO_ZOOM": ['normal size', 'zero zoom', 'no zoom', 'zoom reset', 'reset zoom'],
            "SCROLL_DOWN": ['page down', 'scroll down'],
            "SCROLL_UP": ['page up', 'scroll up'],
            "CANCEL": ['cancel', 'bye', 'thanks'],
            "SEARCH": ['search', 'find'],
            "WAIT": ['wait']
        }

        self._commnad = None

    def run(self):
        self._updater.start()
        while True:
            if self._updater.input_speech:
                print 'state in the beginning is {}'.format(self._statemachine.get_state())
                user_input = self._updater.input_speech
                self._lock.acquire()
                self._updater.input_speech = None
                self._updater.new_input = False
                self._lock.release()
                if self._statemachine.get_state() != 'idle':
                    query = ' '.join(self._sense_extractor.get_context(user_input))
                else:
                    if not self._recognize_start_phrase(user_input):
                        continue
                    for start in self._start_phrases:
                        if start in user_input:
                            user_input = user_input.replace(start, '')
                    query = ' '.join(self._sense_extractor.get_context(user_input))

                print 'proceeding'

                if self._statemachine.get_state() == 'idle':
                    if query:
                        self._statemachine.handle_message('request')
                        self._do_work(self._find_data, query)

                elif self._statemachine.get_state() == 'searching':
                    pass

                elif self._statemachine.get_state() == 'search_failed':

                    if query:
                        self._do_work(self._find_data, query)
                        self._statemachine.handle_message('request')

                    elif self._recognize_command(user_input) == 'CANCEL':
                        self._statemachine.handle_message('cancel')
                        request = {'type': 'OPEN_SCREEN', 'command': 'IDLE'}
                        self._send_command(request)

                elif self._statemachine.get_state() == 'displaying_data':

                    if query:
                        self._do_work(self._find_data, query)
                        self._statemachine.handle_message('request')

                    elif self._recognize_command(user_input) == 'CANCEL':
                        request = {'type': 'OPEN_SCREEN', 'command': 'IDLE'}
                        self._send_command(request)
                        self._start_phrases.handle_message('cancel')

                    elif self._recognize_command(user_input) == 'ZOOM_IN':
                        request = {'type': 'ZOOM_IN', 'command': ''}
                        self._send_command(request)

                    elif self._recognize_command(user_input) == 'ZOOM_OUT':
                        request = {'type': 'ZOOM_OUT', 'command': ''}
                        self._send_command(request)

                    elif self._recognize_command(user_input) == 'SCROLL_DOWN':
                        request = {'type': 'SCROLL_DOWN', 'command': ''}
                        self._send_command(request)

                    elif self._recognize_command(user_input) == 'SCROLL_UP':
                        request = {'type': 'SCROLL_UP', 'command': ''}
                        self._send_command(request)
                print 'state in the end is {}'.format(self._statemachine.get_state())

            else:
                pass
                # print 'no commands'
            time.sleep(.1)

    def _recognize_command(self, data):
        for command in self._commands.keys():
            if data in self._commands[command]:
                print "recognized command is {}, {}".format(command, type(command))
                return str(command)

    def _recognize_start_phrase(self, data):
        for start in self._start_phrases:
            if start in data:
                data = data.replace(start, '')
                return True
        return False

    def _find_data(self, request, result):
        print 'searching data'
        data = {'type': 'OPEN_SCREEN', 'command': 'SEARCH'}
        self._send_command(data)
        data = self._ESclient.search(request)
        print 'opening search screen'
        time.sleep(7)
        print data
        if data:
            data = {'type': 'OPEN_PDF', 'command': data[0][0]}
            self._statemachine.handle_message('found')

        else:
            data = {'type': 'OPEN_SCREEN', 'command': 'ERROR'}
            self._statemachine.handle_message('not_found')
        result.append(data)
        return None

    def _take_time(self, arg, result):
        print 'entered long function'
        time.sleep(10)
        print 'finished long function'
        result.append(12)

    def _do_work(self, function, argument):
        result = []
        print argument
        worker = threading.Thread(target=function, args=(argument, result))
        worker.start()
        while not (self._updater.new_input or result):
            pass
        if result:
            self._send_command(result[0])
            result = None
            return None
        else:
            print 'cancelled'
            return None

    def _send_command(self, command):
        print 'send command'
        self._result_sender.send_data_in_POST(command)
core = Core()
core.start()
