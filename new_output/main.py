from BrowserClient import BrowserClient
from OutputController import OutputController
from PyQt5.QtCore import pyqtSignal


if __name__ == "__main__":
    ui = BrowserClient(False, [300, 900])
    Controller = OutputController()
    Controller.start()
    ui.run()