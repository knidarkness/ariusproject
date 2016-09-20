from AbstractCommandRecognizer import AbstractCommandRecognizer
from CoreOutputSingleton import CoreOutputSingleton


class AbstractCoreCommandProceedingBehavior(object):
    """
    This is an interface for command recognizing behavior. Must implement
    functionality for a method: proceed(user_input), which will implement
    command proceeding, which goes from class` name.
    """

    def __init__(self):
        self._out_link = CoreOutputSingleton.getInstance()
        self._command_recognizer = None
        self.behavior_type = "abstract"
        self.__lock = None

    def setCommandRecognizer(self, recog):
        if isinstance(recog, AbstractCommandRecognizer):
            self._command_recognizer = recog
        else:
            raise ValueError()

    def setLock(self, lock):
        self.__lock = lock

    def proceed(self, user_input): raise NotImplementedError()
