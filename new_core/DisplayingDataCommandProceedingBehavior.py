import random
import sys
from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DiffMatchFinder import DiffMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from SearchCommandProceedingBehaviorSingleton import SearchCommandProceedingBehaviorSingleton
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
        self.__behavior_type = "idle"
        self.__commands_dict = config['core_commands_idle']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader(self.__commands_dict), DiffMatchFinder()))
        self._output_connection = CoreOutputSingleton.getInstance()

    def proceed(self, user_input, parent):
        recognized_command = self._command_recognizer.recognize_command(user_input)

        if recognized_command == "MUTE":
            self._output_connection.sendPOST({'type': 'MUTE', 'command': ''})
        elif recognized_command == "UNMUTE":
            self._output_connection.sendPOST({'type': 'UNMUTE', 'command': ''})
        elif recognized_command == "ZOOM_IN":
            self._output_connection.sendPOST({'type': 'ZOOM_IN', 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['ZOOM_IN'])})
        elif recognized_command == "ZOOM_OUT":
            recognized_command.getInstance().sendPOST({'type': 'ZOOM_OUT', 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['ZOOM_OUT'])})
        elif recognized_command == "SCROLL_DOWN":
            self._output_connection.sendPOST({'type': 'SCROLL_DOWN', 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SCROLL_DOWN'])})
        elif recognized_command == "SCROLL_UP":
            self._output_connection.sendPOST({'type': 'SCROLL_UP', 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SCROLL_UP'])})
        elif recognized_command == "CONTINIOUS_SCROLL_DOWN":
            self._output_connection.sendPOST({'type': 'CONTINIOUS_SCROLL_DOWN', 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SCROLL_DOWN'])})
        elif recognized_command == "STOP_SCROLL":
            self._output_connection.sendPOST({'type': 'STOP_SCROLL', 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['STOP_SCROLL'])})
        elif recognized_command == "CONTINIOUS_SCROLL_UP":
            self._output_connection.sendPOST({'type': 'CONTINIOUS_SCROLL_UP', 'command': ''})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SCROLL_UP'])})
            self._output_connection.sendPOST({'type': 'SPEAK', 'command': random.choice(config['voice_command_output']['SCROLL_UP'])})
        elif recognized_command == "PLAY":
            self._output_connection.sendPOST({'type': 'PLAY', 'command': ''})
        elif recognized_command == "PAUSE":
            self._output_connection.sendPOST({'type': 'PAUSE', 'command': ''})
        elif recognized_command == "VOLUME_UP":
            self._output_connection.sendPOST({'type': 'VOLUME_UP', 'command': ''})
        elif recognized_command == "VOLUME_DOWN":
            self._output_connection.sendPOST({'type': 'VOLUME_DOWN', 'command': ''})
        elif recognized_command == "START":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'SEARCH'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['SEARCH_BEGAN'])})

            parent.setProceedingBehavior(SearchCommandProceedingBehaviorSingleton.getInstance())
            return None
        parent.user_input = None
