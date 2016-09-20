from IdleCommandProceedingBehavior import IdleCommandProceedingBehavior
from HTTPCoreUpdater import HTTPCoreUpdater
import time
import threading
import sys
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core[CoreController]")


class CoreController:
    def __init__(self):
        self.__lock = threading.RLock()

        self._proceeding_behavior = IdleCommandProceedingBehavior.getInstance()
        self._updater = HTTPCoreUpdater(self.__lock)
        self._proceeding_behavior.setLock(self.__lock)
        self.user_input = None
        self.__to_search = False

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
