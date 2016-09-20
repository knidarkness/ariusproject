import random
import sys
from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DifflibMatchFinder import DifflibMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from AbstractCoreCommandProceedingBehavior import AbstractCoreCommandProceedingBehavior
from CommandConfigLoader import CommandConfigLoader
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core[DisplayData]")


class DisplayingDataCommandProceedingBehavior(AbstractCoreCommandProceedingBehavior):
    instance = None

    @staticmethod
    def getInstance():
        if not DisplayingDataCommandProceedingBehavior.instance:
            DisplayingDataCommandProceedingBehavior.instance = DisplayingDataCommandProceedingBehavior()
        return DisplayingDataCommandProceedingBehavior.instance

    def __init__(self):
        super(DisplayingDataCommandProceedingBehavior, self).__init__()
        self.behavior_type = "displaying_data"
        self.__commands_dict = config['core_commands_displaying_data']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader.load(self.__commands_dict), DifflibMatchFinder))
        self._output_connection = CoreOutputSingleton.getInstance()

    def proceed(self, user_input, parent):
        from SearchCommandProceedingBehavior import SearchCommandProceedingBehavior
        recognized_command = self._command_recognizer.recognize_command(user_input)
        if recognized_command == "CANCEL":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'IDLE'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['CANCEL'])})
            from IdleCommandProceedingBehavior import IdleCommandProceedingBehavior
            parent.setProceedingBehavior(IdleCommandProceedingBehavior.getInstance())
            return None
        elif recognized_command in self.__commands_dict and recognized_command != 'START' and recognized_command != "DETAILED_DATA":
            self._output_connection.sendPOST({'type': recognized_command, 'command': ''})
            if recognized_command not in ['PLAY', 'PAUSE']:
                self._output_connection.sendPOST({'type': 'SPEAK',
                                                  'command': random.choice(config['voice_command_output'][recognized_command])})
        elif recognized_command == 'DETAILED_DATA':
            logger.info('Trying to find more info...')

            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'SEARCH'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['DETAILED_DATA'])})
            parent.user_input = SearchCommandProceedingBehavior.getInstance().prev_query
            parent.setProceedingBehavior(SearchCommandProceedingBehavior.getInstance())
            return None

        elif recognized_command == "START":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'SEARCH'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SEARCH_BEGAN'])})
            parent.setProceedingBehavior(SearchCommandProceedingBehavior.getInstance())
            return None

        parent.user_input = None
