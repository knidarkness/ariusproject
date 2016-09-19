from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DiffMatchFinder import DiffMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from SearchCommandProceedingBehaviorSingleton import SearchCommandProceedingBehaviorSingleton
from AbstractCoreCommandProceedingBehavior import AbstractCoreCommandProceedingBehavior
from CommandConfigLoader import CommandConfigLoader
from singleton import singleton
import random
import sys
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core")


@singleton
class SearchFailedCommandProceedingBehavior(AbstractCoreCommandProceedingBehavior):

    def __init__(self, recog):
        super(SearchFailedCommandProceedingBehavior, self).__init__(recog)
        self.__behavior_type = 'search_failed'
        self.__commands_dict = config['core_commands_search_failed']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader(self.__commands_dict), DiffMatchFinder()))
        self._output_connection = CoreOutputSingleton.getInstance()

    def proceed(self, user_input, parent):
        recognized_command = self._command_recognizer.recognize_command(user_input)

        if recognized_command == "MUTE":
            self._output_connection.sendPOST({'type': 'MUTE', 'command': ''})
        elif recognized_command == "UNMUTE":
            self._output_connection.sendPOST({'type': 'UNMUTE', 'command': ''})
        elif recognized_command == "START":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'SEARCH'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SEARCH_BEGAN'])})

            parent.setProceedingBehavior(SearchCommandProceedingBehaviorSingleton.getInstance())
            return None
        parent.user_input = None
