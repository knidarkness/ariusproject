from IdleCommandProceedingBehaviorSingleton import IdleCommandProceedingBehaviorSingleton
from HTTPCoreUpdaterSingleton import HTTPCoreUpdaterSingleton
import time
import sys
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core")


class CoreController:
    def __init__(self):
        self._processing_behavior = IdleCommandProceedingBehaviorSingleton.getInstance()
        self._updater = HTTPCoreUpdaterSingleton.getInstance()

    def run(self):
        while(True):
            if self._updater.userInput() != None:
                self._processing_behavior.proceed(self._updater.userInput(), self)
            time.sleep(config['core_update_interval'])
