from PyQt5.QtWebKitWidgets import QWebPage
import sys
sys.path.append("../")
from config import config


class FakePage(QWebPage):
    """
    This is a class for changing user-agent in
    the QWebPage.
    """

    def __init__(self, parent=None):
        super(FakePage, self).__init__()

    def userAgentForUrl(self, url):
        return config['output_user_agent']
