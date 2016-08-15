import sys
import threading
import time
sys.path.append("../")
from client import RESTClient
from statemachine import statemachine
from configure import ConstExtractor
from sense_extraction import SenseExtractor
from arius_searcher import ESearchClient


class CoreModule:
    """
    This class is a two-threaded class for core module
    of the Arius.
    """

    def __init__(self):
        self._settings = ConstExtractor()
        self._state_machine = statemachine
        self._input_client = RESTClient(self._settings.getValue("core_server_input_address"),
                                        self._settings.getValue(
                                            "core_server_input_port"),
                                        self._settings.getValue("core_server_input_url"))

        self._output_client = RESTClient(self._settings.getValue("core_server_output_address"),
                                         self._settings.getValue(
                                             "core_server_output_port"),
                                         self._settings.getValue("core_server_output_url"))
        self._user_input = None
        self._lock = threading.RLock()
        self._sense_extarctor = SenseExtractor("stop.txt")
        self._command = None
        self._ESclient = ESearchClient()
        self._key_phrases = None
        self._q_type = None
        self._synonyms = {
            "START_PHRASES": ['ok arius', 'what is that', 'what the fuck'],
            "ZOOM_IN": ['zoom in', 'increase', 'enlarge', 'zoom more'],
            "ZOOM_OUT": ['shrink', 'decrease', 'zoom less', 'zoom out'],
            "NO_ZOOM": ['normal size', 'zero zoom', 'no zoom', 'zoom reset', 'reset zoom'],
            "SCROLL_DOWN": ['page down', 'scroll down'],
            "SCROLL_UP": ['page up', 'scroll up'],
            "CANCEL": ['cancel', 'bye', 'thanks'],
            "search": ['search', 'find']
        }

    def _get_command(self, data):
        for command in self._synonyms.keys():
            if data in self._synonyms[command]:
                print "recognized command is {}, {}".format(command, type(command))
                return str(command)

    def _update(self):
        while True:
            server_data = self._input_client.GET_request(True, 0)
            if server_data['speech_text'] != 'no updates':
                self._lock.acquire()
                try:
                    enable = False
                    if self._state_machine.get_state() == 'idle':
                        for s_phrase in self._synonyms["START_PHRASES"]:
                            if s_phrase in server_data['speech_text']:
                                enable = True
                                server_data['speech_text'] = server_data[
                                    'speech_text'].replace(s_phrase, '')
                    else:
                        enable = True
                    if enable:
                        self._user_input = server_data['speech_text']
                        self._key_phrases = self._sense_extarctor.get_context(
                            self._user_input)
                        if self._key_phrases:
                            self._q_type = 'search'
                            self._command = str(self._key_phrases)
                        else:
                            self._q_type = 'control'
                            self._command = self._get_command(self._user_input)

                    print 'Inputed data\n{}\n{}\n{}'.format(self._user_input, self._q_type, self._command)
                finally:
                    self._lock.release()
                    print self._user_input, self._key_phrases
            time.sleep(1)

    def _handle(self):
        while True:

            self._lock.acquire()
            try:
                if self._command:
                    print 'State in the beginning of the loop is {}'.format(self._state_machine.get_state())

                    if self._state_machine.get_state() == 'idle':
                        if self._q_type == 'search':
                            self._state_machine.handle_message('request')

                    elif self._state_machine.get_state() == 'searching_data':
                        if self._command == 'cancel':
                            self._output_client.send_data_in_POST(
                                {"type": "OPEN_ARIUS_SCREEN", "command": "OPEN_IDLE"})
                            self._state_machine.handle_message('cancel')
                            self._command = None
                        else:
                            result = self._ESclient.search(self._command)
                            self._key_phrases = None
                            self._command = None
                            self._q_type = None
                            if result:
                                self._open_data(result[0][0])
                                self._state_machine.handle_message('found')
                            else:
                                self._browser_command("OPEN_ERROR")
                                self._state_machine.handle_message('not_found')

                    elif self._state_machine.get_state() == 'search_failed':
                        if self._q_type == 'control':
                            if self._command == 'CANCEL':
                                print 'Sending command to open error screen'
                                self._browser_command("OPEN_IDLE")
                                self._state_machine.handle_message('cancel')
                                self._key_phrases = None
                                self._command = None
                                self._q_type = None
                        elif self._q_type == 'search':
                            print 'new search'
                            self._state_machine.handle_message('request')

                    elif self._state_machine.get_state() == 'displaying_data':
                        if self._q_type == 'control':
                            print self._command
                            if self._command == 'CANCEL':
                                print 'Cancelling operation'
                                self._browser_command("OPEN_IDLE")
                                self._state_machine.handle_message('cancel')
                                self._command = None
                            else:
                                self._browser_command(self._command)
                            self._key_phrases = None
                            self._command = None
                            self._q_type = None
                        elif self._q_type == 'search':
                            self._state_machine.handle_message('request')

                    elif self._state_machine.get_state() == 'external_search':
                        pass

                    else:
                        print 'Bad statemachine state. Doing nothing'
                        break

                    print 'State in the end of the loop is {}'.format(self._state_machine.get_state())

            finally:
                self._lock.release()
                time.sleep(1)

    def _open_data(self, link):
        self._output_client.send_data_in_POST(
            {"type": "OPEN_LOCAL", "command": link})

    def _browser_command(self, command):
        if command == 'ZOOM_IN':
            self._output_client.send_data_in_POST(
                {"type": "BROWSER_CONTROL", "command": "ZOOM_IN"})
        elif command == 'ZOOM_OUT':
            self._output_client.send_data_in_POST(
                {"type": "BROWSER_CONTROL", "command": "ZOOM_OUT"})
        elif command == 'SCROLL_DOWN':
            self._output_client.send_data_in_POST(
                {"type": "BROWSER_CONTROL", "command": "SCROLL_DOWN"})
        elif command == 'SCROLL_UP':
            self._output_client.send_data_in_POST(
                {"type": "BROWSER_CONTROL", "command": "SCROLL_UP"})
        elif command == 'OPEN_ERROR':
            self._output_client.send_data_in_POST(
                {"type": "OPEN_ARIUS_SCREEN", "command": "OPEN_ERROR"})
        elif command == 'OPEN_IDLE':
            self._output_client.send_data_in_POST(
                {"type": "OPEN_ARIUS_SCREEN", "command": "OPEN_IDLE"})
        elif command == 'OPEN_SEARCH':
            self._output_client.send_data_in_POST(
                {"type": "OPEN_ARIUS_SCREEN", "command": "OPEN_SEARCH"})

    def _open_screen(self, screen):
        self._output_client.send_data_in_POST({"OPEN_ARIUS_SCREEN": screen})

    def run(self):
        updater = threading.Thread(target=self._update, args=())
        worker = threading.Thread(target=self._handle, args=())
        updater.start()
        worker.start()
        print "Threads are working now..."

core = CoreModule()
core.run()
