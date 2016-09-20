from IdleCommandProceedingBehavior import IdleCommandProceedingBehavior
from HTTPCoreUpdater import HTTPCoreUpdater
from CoreOutputSingleton import CoreOutputSingleton
import time
import threading
import sys
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core[CoreController]")


class CoreController:
    """
    This is a main class of the core module.

    It implements interaction between instance of AbstractCoreUpdater
    and ProceedingBehavior objects of the Core module.

    Also, in this class user can set Updater source, which
    can be useful in case of dynimical env.
    """

    def __init__(self):
        self.__lock = threading.RLock()

        self._output_connection = CoreOutputSingleton.getInstance()
        self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'IDLE'})
        self._proceeding_behavior = IdleCommandProceedingBehavior.getInstance()
        self._updater = HTTPCoreUpdater(self.__lock)
        self._proceeding_behavior.setLock(self.__lock)
        self.user_input = None

    def run(self):
        self._updater.start()
        while(True):
            u_input = self._updater.userInput()
            if u_input != None or self.user_input != None:
                if u_input != None:
                    self.user_input = u_input
                logger.debug("Received user input %s", self.user_input)
                self._proceeding_behavior.proceed(self.user_input, self)
            time.sleep(config['core_update_interval'])

    def setProceedingBehavior(self, proceeding_behavior):
        logger.info("Changing state to %s", proceeding_behavior.behavior_type)
        self._proceeding_behavior = proceeding_behavior
