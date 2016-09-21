import sys
import subprocess
from FakePage import FakePage
from PyQt5 import QtCore, QtWidgets
from PyQt5.QtCore import QUrl, QTimer, QThread, pyqtSignal, QObject
from PyQt5.QtWidgets import QGridLayout, QWidget
from PyQt5.QtWebKitWidgets import QWebView
from PyQt5.QtWebKit import QWebSettings
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Output[BrowserClient]")


class BrowserController(QObject):

    def __init__(self, parent, fullscreen, sizes):
        """
        This constructor function initializes a layout of the Arius output
        module but doesn`t displays it on the screen.

        Firstly, it creates a new app and detects screens configuration.
        Then, QGridLayout is created and its appearance is configured: margins
        and spaces between elements is set to 0.

        After that, we create three QWebViews: one for our main content view
        and two others for header and footer views.

        Immideately after creating these instances we assign them their heights
        according to percentages given by user and dimensions of the screen.

        Next, we remove scroll bars from top and bottom views and load predefined
        pages into them.

        Then we allow QWebKit to run all extensions it needs to render the page.

        After that, wee set the layout design as a grid of three rows.

        Finally, we create an updater object which will run in another stream and
        a timer instance which checks that stream for new commands
        from the server, and in case if there`s some update handles it.
        """
        super(BrowserController, self).__init__()
        if not fullscreen and not sizes:
            print 'You must initialize windows size'
            raise Exception
        self._fullscreen = fullscreen
        if sizes:
            self._screen_width = sizes[0]
            self._screen_height = sizes[1]
        self._app = QtWidgets.QApplication(sys.argv)
        self._app.setStyle("Fusion")
        if self._fullscreen:
            self._get_screen_height()

        self._layout = QGridLayout()
        self._layout.setSpacing(0)
        self._layout.setContentsMargins(0, 0, 0, 0)

        self._main_browser = QWebView()
        main_page = FakePage(self)
        self._main_browser.setPage(main_page)

        self._top_browser = QWebView()
        self._bottom_browser = QWebView()

        self._top_browser_height = config['output_header_height'] * self._screen_height
        self._bottom_browser_height = config['output_footer_height'] * self._screen_height

        self._top_browser.setMaximumHeight(self._top_browser_height)
        self._top_browser.setMinimumHeight(self._top_browser_height)

        self._bottom_browser.setMaximumHeight(self._bottom_browser_height)
        self._bottom_browser.setMinimumHeight(self._bottom_browser_height)

        self._top_browser.page().mainFrame().setScrollBarPolicy(
            QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)
        self._main_browser.page().mainFrame().setScrollBarPolicy(
            QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)
        self._main_browser.page().mainFrame().setScrollBarPolicy(
            QtCore.Qt.Horizontal, QtCore.Qt.ScrollBarAlwaysOff)
        self._bottom_browser.page().mainFrame().setScrollBarPolicy(
            QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)

        self._top_browser_load_url(
            config['flask_server_home'] + config['output_browser_top_page'])
        self._bottom_browser_load_url(
            config['flask_server_home'] + config['output_browser_bottom_page'])

        self._main_browser.settings().setAttribute(
            QWebSettings.DeveloperExtrasEnabled, True)
        self._main_browser.settings().setAttribute(QWebSettings.PluginsEnabled, True)
        QWebSettings.setObjectCacheCapacities(0, 0, 0)
        self._main_browser.settings().setAttribute(
            QWebSettings.AcceleratedCompositingEnabled, True)
        self._main_browser.settings().setAttribute(QWebSettings.WebGLEnabled, True)

        self._layout.addWidget(self._top_browser, 1, 0)
        self._layout.addWidget(self._main_browser, 2, 0)
        self._layout.addWidget(self._bottom_browser, 3, 0)
        self._parent = parent
        self._parent.load_url.connect(self._load_url)
        self._parent.js_execution.connect(self._execute_js)
        self._parent.zooming.connect(self._zoom)

    def run(self):
        self._main_window = QWidget()  # create a window as a QWidget
        self._main_window.setLayout(self._layout)  # assign a layout to it
        if self._fullscreen:
            self._main_window.showFullScreen()  # set full screen enabled
        else:
            self._main_window.resize(self._screen_width, self._screen_height)
        self._main_window.show()  # and finally, show the window
        # and set a trigger to exit the app, as window is closed
        sys.exit(self._app.exec_())

    def _get_screen_height(self):
        if self._fullscreen:
            output = subprocess.Popen('xrandr | grep "\*" | cut -d" " -f4',
                                      shell=True, stdout=subprocess.PIPE).communicate()[0]
            output = [int(val) for val in output.split('x')]
            self._screen_height = output[1]
            self._screen_width = output[0]
        else:
            output = [self._width, self._height]
        return output[0], output[1]

    def _zoom(self, factor):
        self._main_browser.page().mainFrame().setZoomFactor(factor)

    def _top_browser_load_url(self, url):
        self._top_browser.load(QUrl(url))

    def _bottom_browser_load_url(self, url):
        self._bottom_browser.load(QUrl(url))

    def _load_url(self, url):
        logger.debug('OPENING URL %s', url)
        self._main_browser.load(QUrl(url))

    def _execute_js(self, string_js):
        logger.debug(string_js)
        self._main_browser.page().mainFrame().evaluateJavaScript(string_js)
