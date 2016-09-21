from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DifflibMatchFinder import DifflibMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from CommandConfigLoader import CommandConfigLoader
from AbstractCoreCommandProceedingBehavior import AbstractCoreCommandProceedingBehavior
import random
import sys
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core[Idle]")


class IdleCommandProceedingBehavior(AbstractCoreCommandProceedingBehavior):
    instance = None

    @staticmethod
    def getInstance():
        if not IdleCommandProceedingBehavior.instance:
            IdleCommandProceedingBehavior.instance = IdleCommandProceedingBehavior()
        return IdleCommandProceedingBehavior.instance

    def __init__(self):
        super(IdleCommandProceedingBehavior, self).__init__()
        self.behavior_type = "idle"
        self.__commands_dict = config['core_commands_idle']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader.load(self.__commands_dict), DifflibMatchFinder))
        self._output_connection = CoreOutputSingleton.getInstance()

    def proceed(self, user_input, parent):

        from SearchCommandProceedingBehavior import SearchCommandProceedingBehavior
        recognized_command = self._command_recognizer.recognize_command(user_input)

        if recognized_command == "CANCEL":
            SearchCommandProceedingBehavior.getInstance()._history = []
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'IDLE'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['CANCEL'])})
            parent.setProceedingBehavior(IdleCommandProceedingBehavior.getInstance())
            parent.user_input = None
            return None
        elif recognized_command == "MUTE":
            self._output_connection.sendPOST({'type': 'MUTE', 'command': ''})
        elif recognized_command == "UNMUTE":
            self._output_connection.sendPOST({'type': 'UNMUTE', 'command': ''})
        elif recognized_command == "START":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'SEARCH'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SEARCH_BEGAN'])})

            parent.setProceedingBehavior(SearchCommandProceedingBehavior.getInstance())
            return None

        parent.user_input = None
