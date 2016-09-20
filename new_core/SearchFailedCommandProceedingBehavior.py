from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DifflibMatchFinder import DifflibMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from AbstractCoreCommandProceedingBehavior import AbstractCoreCommandProceedingBehavior
from CommandConfigLoader import CommandConfigLoader
import random
import sys
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core[SearchFailed]")


class SearchFailedCommandProceedingBehavior(AbstractCoreCommandProceedingBehavior):
    """
    This class is implemented as a singleton as it is
    required to call the same instance during all program run.
    """
    instance = None

    @staticmethod
    def getInstance():
        if not SearchFailedCommandProceedingBehavior.instance:
            SearchFailedCommandProceedingBehavior.instance = SearchFailedCommandProceedingBehavior()
        return SearchFailedCommandProceedingBehavior.instance

    def __init__(self):
        super(SearchFailedCommandProceedingBehavior, self).__init__()
        self.behavior_type = 'search_failed'
        self.__commands_dict = config['core_commands_search_failed']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader.load(self.__commands_dict), DifflibMatchFinder))
        self._output_connection = CoreOutputSingleton.getInstance()

    def proceed(self, user_input, parent):
        recognized_command = self._command_recognizer.recognize_command(user_input)

        if recognized_command == "MUTE":
            self._output_connection.sendPOST({'type': 'MUTE', 'command': ''})
        elif recognized_command == "UNMUTE":
            self._output_connection.sendPOST({'type': 'UNMUTE', 'command': ''})
        elif recognized_command == "CANCEL":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'IDLE'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['CANCEL'])})
            from IdleCommandProceedingBehavior import IdleCommandProceedingBehavior
            parent.setProceedingBehavior(IdleCommandProceedingBehavior.getInstance())
            return None
        elif recognized_command == "START":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'SEARCH'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SEARCH_BEGAN'])})
            from SearchCommandProceedingBehavior import SearchCommandProceedingBehavior
            parent.setProceedingBehavior(SearchCommandProceedingBehavior.getInstance())
            return None

        parent.user_input = None
