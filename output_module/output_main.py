import time
# import pyautogui
import sys
import subprocess
import threading
import functools
from PyQt5 import QtCore, QtWidgets
from PyQt5.QtCore import QUrl, QTimer
from PyQt5.QtWidgets import QGridLayout, QWidget
from PyQt5.QtWebKitWidgets import QWebView
from PyQt5.QtWebKit import QWebSettings
from tts_module import Speaker
sys.path.append("../")
from config import config
from client import RESTClient

TAG = "[Output Module]"


class OutputUpdater(threading.Thread):
    def __init__(self, lock):
        threading.Thread.__init__(self)

        self._server_host = config["output_server_host"]
        self._server_port = config["output_server_port"]
        self._server_url = config["output_server_url"]

        self._server_connection = RESTClient(self._server_host, self._server_port, self._server_url)

        self._current_command_type = None
        self._current_command_body = None

        self._lock = lock

        self.running = True

    def run(self):
        while self.running:
            # print TAG, 'connecting'
            data = self._server_connection.GET_request(True, 0)
            if data['type'] != 'none':
                print TAG, data
                self._lock.acquire()
                try:
                    self._current_command_type = data['type']
                    self._current_command_body = data['command']
                    print TAG, 'Command received: {} : {}'.format(data['type'], data['command'])
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

        self._top_browser_load_url(config['output_browser_top_page'])
        self._bottom_browser_load_url(config['output_browser_bottom_page'])

        self._main_browser.settings().setAttribute(QWebSettings.DeveloperExtrasEnabled, True)  # enable console
        self._main_browser.settings().setAttribute(QWebSettings.PluginsEnabled, True)
        QWebSettings.setObjectCacheCapacities(0, 0, 0)
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

        self.speaker = None

    def run(self):
        self._main_window = QWidget()
        self._main_window.setLayout(self._layout)
        self._main_window.showFullScreen()
        self._main_window.show()
        sys.exit(self._app.exec_())
        print TAG, 'Finished'

    def _handle_command(self):
        command = self._updater.get_state()
        if command[0] != 'none' and command[0] != None:
            print TAG, 'Handling command {}'.format(command)
            self._updater.reset()
            if command[0] == 'OPEN_PDF':
                self._loadPDF(command[1])
            elif command[0] == 'OPEN_URL':
                self._loadExternalPage(command[1])
            elif command[0] == 'OPEN_LOCAL_PAGE':
                self._loadLocalPage(command[1])
            elif command[0] == 'OPEN_VIDEO':
                self._loadVideo(command[1])
            elif command[0] == 'OPEN_SCREEN':
                if command[1] == 'IDLE':
                    self._load_idle()
                elif command[1] == 'ERROR':
                    self._load_error()
                elif command[1] == 'SEARCH':
                    self._load_search()
            elif command[0] == 'ZOOM_IN':
                self._main_browser_zoom_in()
            elif command[0] == 'ZOOM_OUT':
                self._main_browser_zoom_out()
            elif command[0] == 'ZOOM_NONE':
                self._main_browser_reset_zoom()
            elif command[0] == 'SCROLL_DOWN':
                self._main_browser_scroll_down()
            elif command[0] == 'SCROLL_UP':
                self._main_browser_scroll_up()
            elif command[0] == 'PLAY':
                self._video_play()
            elif command[0] == 'PAUSE':
                self._video_pause()
            elif command[0] == "SPEAK":
                self._speak_text(command[1])
            elif command[0] == "STOP_SPEAK":
                self._speak_stop()
            else:
                print TAG, 'command not recognized'
        else:
            pass

    def _get_screen_height(self):
        output = subprocess.Popen('xrandr | grep "\*" | cut -d" " -f4', shell=True, stdout=subprocess.PIPE).communicate()[0]
        output = [int(val) for val in output.split('x')]
        self._screen_height = output[1]
        self._screen_width = output[0]
        return output[0], output[1]

    def _load_error(self):
        self._main_browser_reset_zoom()
        url = 'http://' + config['flask_server_address'] + ':' + config['flask_server_port'] + config['flask_server_error_address']
        print url
        self._main_browser.load(QUrl(url))

    def _load_idle(self):
        self._main_browser_reset_zoom()
        url = 'http://' + config['flask_server_address'] + ':' + config['flask_server_port'] + config['flask_server_idle_address']
        print url
        self._main_browser.load(QUrl(url))

    def _load_search(self):
        self._main_browser_reset_zoom()
        url = 'http://' + config['flask_server_address'] + ':' + config['flask_server_port'] + config['flask_server_search_address']
        print url
        self._main_browser.load(QUrl(url))

    def _loadPDF(self, path):
        self._main_browser_reset_zoom()
        source = "file://" + config['root_dir'] + config['output_data_pdf_viewer'] + "?file=" + path
        print source
        self._cur_filetype = "pdf"
        self._main_browser.load(QUrl(source))

    def _loadVideo(self, filename):
        self._main_browser_reset_zoom()
        url = config['root_dir'] + config['output_videoplayer_path']
        print url
        # TODO: remove this very strange and stupid code
        html = open(url, "rb").read()
        # open videoplayer.html, replace src to new src and rewrite this file
        open(url, "r+").write(html[:html.find("src=") + 5] + filename + html[html.find("\"", html.find("src=") + 5):])
        url = "file:///" + url
        self._cur_filetype = "video"
        self._main_browser.load(QUrl(url))

    def _loadExternalPage(self, url):
        self._main_browser_reset_zoom()
        print TAG, 'Loading external page: {}'.format(url)
        self._cur_filetype = "webpage"
        self._main_browser.load(QUrl(url))

    def _loadLocalPage(self, path):
        self._main_browser_reset_zoom()
        url = 'file://' + path
        print url
        self._cur_filetype = "webpage"
        self._main_browser.load(QUrl(url))

    def _top_browser_load_url(self, url):
        self._top_browser.load(QUrl(url))

    def _bottom_browser_load_url(self, url):
        self._bottom_browser.load(QUrl(url))

    def _main_browser_scroll_down(self):
        scroll_js = open("scroll.js", "r").read()
        self._main_browser.page().mainFrame().evaluateJavaScript(scroll_js)
        if self._cur_filetype == "pdf":
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(PDFViewerApplication.pdfViewer.container, 300, 1000);")
        elif self._cur_filetype == "webpage":
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(document.body, 300, 1000);")

    def _main_browser_scroll_up(self):
        scroll_js = open("scroll.js", "r").read()
        self._main_browser.page().mainFrame().evaluateJavaScript(scroll_js)
        if self._cur_filetype == "pdf":
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(PDFViewerApplication.pdfViewer.container, -300, 1000);")
        elif self._cur_filetype == "webpage":
            self._main_browser.page().mainFrame().evaluateJavaScript("smooth_scroll_by(document.body, -300, 1000);")

    def _main_browser_zoom_in(self):
        self._zoom_factor += .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _main_browser_reset_zoom(self):
        self._zoom_factor = 1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _main_browser_zoom_out(self):
        self._zoom_factor -= .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _speak_text(self, input_text):
        voice = config["default_voice"]
        if self.speaker is None:
            self.speaker = Speaker(config[voice], config["marytts_host"], config["marytts_port"])
        else:
            self.speaker.stop()
        self.speaker.speak(input_text)
        pass

    def _speak_stop(self):
        self.speaker.stop()
        pass

    def _video_play(self):
        script_js = """video=document.getElementById("videoplayer"); video.play()"""
        self._main_browser.page().mainFrame().evaluateJavaScript(script_js)

    def _video_pause(self):
        script_js = """video=document.getElementById("videoplayer"); video.pause()"""
        self._main_browser.page().mainFrame().evaluateJavaScript(script_js)


if __name__ == "__main__":
    ui = OutputInterface(float(config['output_top_browser_size']), float(config['output_bottom_browser_size']))
    ui.run()
