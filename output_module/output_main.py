import time
# import pyautogui
import sys
import os
import subprocess
import threading
import thread
import functools
from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtCore import QUrl, QEventLoop, QTimer
from PyQt5.QtWidgets import QApplication, QGridLayout, QWidget
from PyQt5.QtWebKitWidgets import QWebView
from PyQt5.QtWebKit import QWebSettings
sys.path.append("../")
from configure import ConstExtractor
from tts_module import tts_mary

from client import RESTClient


class OutputUpdater(threading.Thread):
    def __init__(self, lock):
        threading.Thread.__init__(self)
        self._settings = ConstExtractor()

        self._server_host = self._settings.getValue("output_server_host")
        self._server_port = self._settings.getValue("output_server_port")
        self._server_url = self._settings.getValue("output_server_url")

        self._server_connection = RESTClient(self._server_host, self._server_port, self._server_url)

        self._current_command_type = None
        self._current_command_body = None

        self._lock = lock

        self.running = True

    def run(self):
        while self.running:
            print 'connecting'
            data = self._server_connection.GET_request(True, 0)
            if data['type'] != 'none':
                print data
                self._lock.acquire()
                try:
                    self._current_command_type = data['type']
                    self._current_command_body = data['command']
                    print 'command received: {} : {}'.format(data['type'], data['command'])
                finally:
                    self._lock.release()
            else:
                pass
            time.sleep(1)

    def reset(self):
        self._lock.acquire()
        self._current_command_body = None
        self._current_command_type = None
        self._lock.release()

    def get_state(self):
        return self._current_command_type, self._current_command_body


class OutputInterface:
    def __init__(self, top_size, bottom_size):
        self._app = QtWidgets.QApplication(sys.argv)
        self._app.setStyle("Fusion")
        self._settings = ConstExtractor()
        self._pdf_viewer_path = self._settings.getValue("output_data_pdf_viewer")
        self._pdfs_path = self._settings.getValue("output_pdf_data_files")

        self._get_screen_height()

        self._layout = QGridLayout()
        self._layout.setSpacing(0)
        self._layout.setContentsMargins(0, 0, 0, 0)

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

        self._top_browser.page().mainFrame().setScrollBarPolicy(QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)
        # self._main_browser.page().mainFrame().setScrollBarPolicy(QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)
        self._bottom_browser.page().mainFrame().setScrollBarPolicy(QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)

        self._top_browser_load_url(self._settings.getValue('output_browser_top_page'))
        self._bottom_browser_load_url(self._settings.getValue('output_browser_bottom_page'))

        self._main_browser.settings().setAttribute(QWebSettings.PluginsEnabled, True)

        self._layout.addWidget(self._top_browser, 1, 0)
        self._layout.addWidget(self._main_browser, 2, 0)
        self._layout.addWidget(self._bottom_browser, 3, 0)

        self._lock = threading.RLock()
        self._updater = OutputUpdater(self._lock)

        self._updater.start()

        self.timeoutTimer = QTimer()
        tCallback = functools.partial(self._handle_command)
        self.timeoutTimer.timeout.connect(tCallback)
        self.timeoutTimer.start(1000)

        self._cur_filetype = None

    def run(self):
        self._main_window = QWidget()
        self._main_window.setLayout(self._layout)
        self._main_window.showFullScreen()
        self._main_window.show()
        sys.exit(self._app.exec_())
        print 'finished'

    def _handle_command(self):
        command = self._updater.get_state()
        if command[0] != 'none' and command[0] != None:
            self._updater.reset()
            if command[0] == 'OPEN_PDF':
                self._loadPDF(command[1])
            elif command[0] == 'OPEN_URL':
                self._loadExternalPage(command[1])
            elif command[0] == 'OPEN_LOCAL_PAGE':
                self._loadLocalPage(command[1])
            elif command[0] == 'ZOOM_IN':
                self._main_browser_zoom_in()
            elif command[0] == 'ZOOM_OUT':
                self._main_browser_zoom_out()
            elif command[0] == 'SCROLL_DOWN':
                self._main_browser_scroll_down()
            elif command[0] == 'SCROLL_UP':
                self._main_browser_scroll_up()
            else:
                print 'command not recognized'
        else:
            pass

    def _get_screen_height(self):
        output = subprocess.Popen('xrandr | grep "\*" | cut -d" " -f4', shell=True, stdout=subprocess.PIPE).communicate()[0]
        output = [int(val) for val in output.split('x')]
        self._screen_height = output[1]
        self._screen_width = output[0]
        return output[0], output[1]

    def _loadPDF(self, filename):
        source = "file://" + os.path.dirname(os.path.abspath(__file__)) + "/../data/web/viewer.html?file=data/" + filename
        print source
        self._cur_filetype = "pdf"
        self._main_browser.load(QUrl(source))

    def _loadExternalPage(self, url):
        print 'loading {}'.format(url)
        self._cur_filetype = "webpage"
        self._main_browser.load(QUrl(url))

    def _loadLocalPage(self, filename):
        url = 'file://' + self._files_path + filename
        self._cur_filetype = "webpage"
        self._main_browser.load(QUrl(url))

    def _top_browser_load_url(self, url):
        self._top_browser.load(QUrl(url))

    def _bottom_browser_load_url(self, url):
        self._bottom_browser.load(QUrl(url))

    def _main_browser_scroll_down(self):
        scroll_js = """var smooth_scroll_by=function(a,b,c){if(target=Math.round(b)+a.scrollTop,c=Math.round(c),c<0)return Promise.reject("bad duration");if(0===c)return a.scrollTop=target,Promise.resolve();var d=Date.now(),e=d+c,f=a.scrollTop,g=target-f,h=function(a,b,c){if(c<=a)return 0;if(c>=b)return 1;var d=(c-a)/(b-a);return d*d*(3-2*d)};return new Promise(function(b,c){var i=a.scrollTop,j=function(){if(a.scrollTop!=i)return void c("interrupted");var k=Date.now(),l=h(d,e,k),m=Math.round(f+g*l);return a.scrollTop=m,k>=e?void b():a.scrollTop===i&&a.scrollTop!==m?void b():(i=a.scrollTop,void setTimeout(j,0))};setTimeout(j,0)})};"""
        self._main_browser.page().mainFrame().evaluateJavaScript(scroll_js)
        if self._cur_filetype == "pdf":
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(PDFViewerApplication.pdfViewer.container, 300, 1000);")
        else:
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(document.body, 300, 1000);")

    def _main_browser_scroll_up(self):
        scroll_js = """var smooth_scroll_by=function(a,b,c){if(target=Math.round(b)+a.scrollTop,c=Math.round(c),c<0)return Promise.reject("bad duration");if(0===c)return a.scrollTop=target,Promise.resolve();var d=Date.now(),e=d+c,f=a.scrollTop,g=target-f,h=function(a,b,c){if(c<=a)return 0;if(c>=b)return 1;var d=(c-a)/(b-a);return d*d*(3-2*d)};return new Promise(function(b,c){var i=a.scrollTop,j=function(){if(a.scrollTop!=i)return void c("interrupted");var k=Date.now(),l=h(d,e,k),m=Math.round(f+g*l);return a.scrollTop=m,k>=e?void b():a.scrollTop===i&&a.scrollTop!==m?void b():(i=a.scrollTop,void setTimeout(j,0))};setTimeout(j,0)})};"""
        self._main_browser.page().mainFrame().evaluateJavaScript(scroll_js)
        if self._cur_filetype == "pdf":
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(PDFViewerApplication.pdfViewer.container, -300, 1000);")
        else:
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(document.body, -300, 1000);")

    def _main_browser_zoom_in(self):
        self._zoom_factor += .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _main_browser_zoom_out(self):
        self._zoom_factor -= .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _text_to_speech(text):
        tts_mary(text)


if __name__ == "__main__":
    conf = ConstExtractor()
    ui = OutputInterface(float(conf.getValue('output_top_browser_size')), float(conf.getValue('output_bottom_browser_size')))
    ui.run()
