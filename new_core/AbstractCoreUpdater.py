import threading


class AbstractCoreUpdater(threading.Thread):
    """
    This is an interface for core updater. It runs inherits from
    threading.Thread as it needs to provide asynchronous updates.
    """
    def userInput(self): raise NotImplementedError()
