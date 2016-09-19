from AbstractCoreUpdater import AbstractCoreUpdater
from PlainHTTPClient import PlainHTTPClient
import sys
import time
import threading
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core")


class HTTPCoreUpdater(AbstractCoreUpdater, threading.Thread):
    def __init__(self, lock, debug=False):
        threading.Thread.__init__(self)
        self._lock = lock
        self._debug = debug
        self._connection = PlainHTTPClient(1, 1, 1)
        self._input_speech = None

    def run(self):
        while True:
            if not self._input_speech:
                command = self._connection.GET_request(True, 0)
                if command['speech_text'] != 'no updates':
                    logger.debug('RECEIVED COMMAND')
                    self._lock.acquire()
                    self._input_speech = command['speech_text']
                    self._lock.release()

            time.sleep(config['core_update_interval'])

    def userInput(self):
        self._lock.acquire()
        u_input = self._input_speech
        self._input_speech = None
        self._lock.release()
        return u_input
