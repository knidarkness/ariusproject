import sys
sys.path.append("../")
from config import config


class CommandConfigLoader(object):
    """
    This class is used to load commands from format
    like ["COM1", "COM2"] to a dictionary, with
    COM1 and COM2 as keys, and keywords from config
    as values.
    """
    @staticmethod
    def load(command_names_list):
        commands_dict = {}
        for command in command_names_list:
            commands_dict[command] = config["core_commands"][command]
        return commands_dict
