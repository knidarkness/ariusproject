# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'mainwindow.ui'
#
# Created by: PyQt5 UI code generator 5.5.1
#
# WARNING! All changes made in this file will be lost!

import time
import sys
import subprocess
import threading
import functools
from client import RESTClient
from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtCore import QUrl, QEventLoop, QTimer
from PyQt5.QtWidgets import QApplication, QGridLayout, QWidget
from PyQt5.QtWebKitWidgets import QWebView
from PyQt5.QtWebKit import QWebSettings
sys.path.append("../")
from configure import ConstExtractor

urls = ['file:///home/sdubovyk/Projects/arius%20%28copy%29/elastic_search_client/docs/test_webpage.html', 'http://bash.im', 'file:///home/sdubovyk/Projects/arius%20%28copy%29/elastic_search_client/docs/Vision.pdf']
i = 0


class OutputUpdater:
    def __init__(self, browser, top_browser, bottom_browser):
        self._settings = ConstExtractor()

        self._main_browser = browser
        self._top_browser = top_browser
        self._bottom_browser = bottom_browser

        self._server_host = self._settings.getValue("output_server_host")
        self._server_port = self._settings.getValue("output_server_port")
        self._server_url = self._settings.getValue("output_server_url")

        self._server_connection = RESTClient(self._server_host, self._server_port, self._server_url)

        self._current_command_type = None
        self._current_command_body = None

        self._lock = threading.RLock()

    def _update_command(self):
        data = self._server_connection.GET_request(True, 0)
        if data['type'] != 'none':
            self._lock.acquire()
            try:
                self._current_command_type = data['type']
                self._current_command_body = data['body']
                print 'command received: {} : {}'.format(data['type'], data['body'])
            finally:
                self._lock.release()
        else:
            pass

    def _execute_command(self):
        pass


class OutputInterface:
    def __init__(self, top_size, bottom_size):
        self._app = QWebView.QApplication(sys.argv)

        self._get_screen_height()

        self._layout = QGridLayout()

        self._main_browser = QWebView()
        self._zoom_factor = 1

        self._top_browser = QWebView()
        self._bottom_browser = QWebView()

        self._top_browser_height = top_size * self._screen_height
        self._bottom_browser_height = bottom_size * self._screen_height

        self._top_browser.setMaximumHeight(self._top_browser_height)
        self._top_browser.setMinimumHeight(self._top_browser_height)

        self._bottom_browser.setMaximumHeight(self._bottom_browser_height)
        self._bottom_browser.setMinimumHeight(self._bottom_browser_height)

        self._main_browser.settings().setAttribute(QWebSettings.PluginsEnabled, True)

        self._layout.addItem(self._top_browser, 1, 0)
        self._layout.addItem(self._main_browser, 2, 0)
        self._layout.addItem(self._bottom_browser, 3, 0)

        self._main_window = QWidget()
        self._main_window.setLayout(self._layout)
        self._main_window.showFullScreen()

    def _get_screen_height(self):
        output = subprocess.Popen('xrandr | grep "\*" | cut -d" " -f4', shell=True, stdout=subprocess.PIPE).communicate()[0]
        output = [int(val) for val in output.split('x')]
        self._screen_height = output[0]
        self._screen_width = output[1]
        return output[0], output[1]

    def show(self):
        self._main_window.show()

    def main_browser_get_url(self, url):
        self._main_browser.load(QUrl(url))

    def top_browser_load_url(self, url):
        self._top_browser.load(QUrl(url))

    def bottom_browser_load_url(self, url):
        self._bottom_browser.load(QUrl(url))

    def main_browser_scroll_down(self):
        self._main_browser.page().mainFrame().scroll(0, 200)

    def main_browser_scroll_up(self):
        self._main_browser.page().mainFrame().scroll(0, -200)

    def main_browser_zoom_in(self):
        self._zoom_factor += .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def main_browser_zoom_out(self):
        self._zoom_factor -= .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def show_pdf(self, filename):
        pass


def update_url(brow):
    global i
    link = urls[i % 3]
    i += 1
    print link
    browser.load(QUrl(link))


def scroll_down(brow):
    brow.page().mainFrame().scroll(0, 200)
    # brow.page().currentFrame().evaluateJavaScript('window.scrollBy(0, 200);')
    print 'scrolled'


def scroll_up(brow):
    brow.page().mainFrame().scroll(0, -200)
    # brow.page().currentFrame().evaluateJavaScript('window.scrollBy(0, -200);')
    print 'scrolled'


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)

    layout = QGridLayout()
    browser = QWebView()
    browser2 = QWebView()
    browser2.setMaximumHeight(300)
    browser2.setMinimumHeight(300)
    layout.addWidget(browser, 1, 0)
    layout.addWidget(browser2, 2, 0)

    browser.page().mainFrame().setScrollBarPolicy(QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)
    browser2.page().mainFrame().setScrollBarPolicy(QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)

    MainWindow = QWidget()
    MainWindow.setLayout(layout)
    MainWindow.showFullScreen()
    browser.settings().setAttribute(QWebSettings.PluginsEnabled, True)
    browser2.settings().setAttribute(QWebSettings.PluginsEnabled, True)
    browser2.load(QUrl("file:///home/sdubovyk/Projects/ariusproject_production/repo/ariusproject/output_module/test.html"))
    browser.settings().setAttribute(QWebSettings.PluginsEnabled, True)
    browser2.settings().setAttribute(QWebSettings.PluginsEnabled, True)

    MainWindow.show()
    browser2.load(QUrl("file:///home/sdubovyk/Projects/ariusproject_production/repo/ariusproject/output_module/test.html"))

    timeoutTimer = QTimer()
    tCallback = functools.partial(update_url, brow=browser)
    timeoutTimer.timeout.connect(tCallback)
    timeoutTimer.start(6000)

    timeoutTimer1 = QTimer()
    tCallback1 = functools.partial(scroll_down, brow=browser2)
    timeoutTimer1.timeout.connect(tCallback1)
    # timeoutTimer1.start(6000)

    sys.exit(app.exec_())
