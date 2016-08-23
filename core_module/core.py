import threading
import sys
import time
import os
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
            "WAIT": ['wait']
        }

        self._commnad = None

    def run(self):
        self._updater.start()
        data = {'type': 'OPEN_SCREEN', 'command': 'IDLE'}
        self._send_command(data)
        while True:
            if self._updater.input_speech:
                print 'state in the beginning is {}'.format(self._statemachine.get_state())
                user_input = self._updater.input_speech
                self._lock.acquire()
                self._updater.input_speech = None
                self._updater.new_input = False
                self._lock.release()

                if self._recognize_command(user_input) == 'CANCEL':
                    self._statemachine.handle_message('cancel')
                    request = {'type': 'OPEN_SCREEN', 'command': 'IDLE'}
                    self._send_command('type':'SPEAK', 'command':'Operation cancelled')
                    self._send_command(request)
                    continue
                if self._statemachine.get_state() == 'displaying_data':
                    if self._recognize_command(user_input) == 'ZOOM_IN':
                        request = {'type': 'ZOOM_IN', 'command': ''}
                        self._send_command({'SPEAK': 'Enlarging'})
                        self._send_command(request)
                        continue
                    elif self._recognize_command(user_input) == 'ZOOM_OUT':
                        request = {'type': 'ZOOM_OUT', 'command': ''}
                        self._send_command({'type': 'SPEAK', 'command': 'Zooming out'})
                        self._send_command(request)
                        continue
                    elif self._recognize_command(user_input) == 'SCROLL_DOWN':
                        request = {'type': 'SCROLL_DOWN', 'command': ''}
                        self._send_command('type':'SPEAK', 'command':'Scrolling down, sir')
                        self._send_command(request)
                        continue
                    elif self._recognize_command(user_input) == 'SCROLL_UP':
                        request = {'type': 'SCROLL_UP', 'command': ''}
                        self._send_command('type':'SPEAK', 'command':'Scrolling up as you wish')
                        self._send_command(request)
                        continue

                if (self._statemachine.get_state() == 'idle' and self._recognize_start_phrase(user_input)) \
                        or self._statemachine.get_state() != 'idle':
                    for start in self._start_phrases:
                        if start in user_input:
                            user_input = user_input.replace(start, '')
                    print [i for j in self._commands.values() for i in j]
                    for word in user_input.split():
                        if word in [i for j in self._commands.values() for i in j]:
                            user_input = user_input.replace(word, '')

                    query = ' '.join(self._sense_extractor.get_context(user_input))
                    print 'proceeding'
                    if query:
                        self._statemachine.handle_message('request')
                        self._send_command('type':'SPEAK', 'command':'Search request accepted, my lord')
                        self._do_work(self._find_data, query)
                    else:
                        print 'search query is empty'
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
            file_ext = os.path.splitext(data[0][0])[1]
            print file_ext
            if file_ext == '.pdf':
                data = {'type': 'OPEN_PDF', 'command': data[0][0]}
                self._statemachine.handle_message('found')
            elif file_ext == '.html':
                data = {'type': 'OPEN_LOCAL_PAGE', 'command': data[0][0]}
                self._statemachine.handle_message('found')
            elif file_ext == '.url':
                data = open(self._settings.getValue('output_server_home') + data[0][0])
                link = data.readlines()[0]
                print link
                data = {'type': 'OPEN_URL', 'command': link}
                self._statemachine.handle_message('found')

        else:
            data = {'type': 'OPEN_SCREEN', 'command': 'ERROR'}
            self._statemachine.handle_message('not_found')
        result.append(data)
        return None

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
        print 'send command', command
        self._result_sender.send_data_in_POST(command)
core = Core()
core.start()
