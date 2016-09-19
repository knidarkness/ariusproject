class DictCommandRecognizerBehavior:
    def __init__(self, commands_dict=None):
        if commands_dict:
            if type(commands_dict) == dict:
                self.__commands_dict = commands_dict
            else:
                raise ValueError('commands_dict must be a dictionary')

    def setCommandsDict(self, commands_dict):
        if type(commands_dict) == dict:
            self.__commands_dict = commands_dict
        else:
            raise ValueError('commands_dict must be a dictionary')

    def proceedInput(self, command): raise NotImplementedError()
