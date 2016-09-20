import random
import sys
from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DifflibMatchFinder import DifflibMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from SearchCommandProceedingBehavior import SearchCommandProceedingBehavior
from AbstractCoreCommandProceedingBehavior import AbstractCoreCommandProceedingBehavior
from CommandConfigLoader import CommandConfigLoader
from singleton import singleton
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core")


@singleton
class DisplayingDataCommandProceedingBehavior(AbstractCoreCommandProceedingBehavior):

    def __init__(self, recog):
        super(DisplayingDataCommandProceedingBehavior, self).__init__(recog)
        self.__behavior_type = "displaying_data"
        self.__commands_dict = config['core_commands_displaying_data']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader(self.__commands_dict), DifflibMatchFinder()))
        self._output_connection = CoreOutputSingleton.getInstance()

    def proceed(self, user_input, parent):
        recognized_command = self._command_recognizer.recognize_command(user_input)
        if recognized_command in self.__commands_dict and recognized_command != 'START':
            self._output_connection.sendPOST({'type': recognized_command, 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output'][recognized_command])})
        elif recognized_command == "START":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'SEARCH'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SEARCH_BEGAN'])})

            parent.setProceedingBehavior(SearchCommandProceedingBehavior)
            return None
        parent.user_input = None
