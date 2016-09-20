import sys
sys.path.append("../")
from config import config


class CommandConfigLoader:
    @staticmethod
    def load(command_names_list):
        commands_dict = {}
        for command in command_names_list:
            commands_dict[command] = config[command]
