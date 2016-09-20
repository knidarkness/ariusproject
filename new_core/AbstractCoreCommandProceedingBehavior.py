from AbstractCommandRecognizer import AbstractCommandRecognizer
from CoreOutputSingleton import CoreOutputSingleton


class AbstractCoreCommandProceedingBehavior:
    """
    This is an interface for command recognizing behavior. Must implement
    functionality for a method: proceed(user_input), which will implement
    command proceeding, which goes from class` name.
    """
    def __init__(self):
        self._out_link = CoreOutputSingleton.getInstance()
        self.__command_recognizer = None
        self.__behavior_type = ""

    @property
    def behavior_type(self):
        return self.__behavior_type

    def setCommandRecognizer(self, recog):
        if isinstance(recog, AbstractCommandRecognizer):
            self.__command_recognizer = recog
        else:
            raise ValueError()

    def proceed(self, user_input): raise NotImplementedError()
