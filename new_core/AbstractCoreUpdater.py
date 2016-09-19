import threading


class AbstractCoreUpdater(threading.Thread):
    def userInput(self): raise NotImplementedError()
