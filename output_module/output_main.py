import time
# import pyautogui
import sys
import subprocess
import threading
import functools
import logging
from PyQt5 import QtCore, QtWidgets
from PyQt5.QtCore import QUrl, QTimer
from PyQt5.QtWidgets import QGridLayout, QWidget
from PyQt5.QtWebKitWidgets import QWebView
from PyQt5.QtWebKit import QWebSettings
from PyQt5 import QtWebKitWidgets
from tts_module import Speaker
from PyQt5.QtNetwork import QNetworkRequest
sys.path.append("../")
from config import config
from client import RESTClient

TAG = "[Output Module]"


class FakeBrowser(QtWebKitWidgets.QWebPage):
    """
    This is a class for changing user-agent in
    the QWebPage.
    """

    def __init__(self, parent=None):
        super(FakeBrowser, self).__init__()

    def userAgentForUrl(self, url):
        return config['output_user_agent']


class OutputUpdater(threading.Thread):
    def __init__(self, lock):
        """
        This is a constructor method for an updater
        class of the Arius output module.

        In creates a HTTP-client instance to communicate with
        server in order to get commands and takes give
        instance of RLock and sets it as its lock.

        Also, it creates a flag 'running' which allwos to kill
        this thread.
        """
        threading.Thread.__init__(self)

        self._server_host = config["output_server_host"]
        self._server_port = config["output_server_port"]
        self._server_url = config["output_server_url"]

        self._server_connection = RESTClient(
            self._server_host, self._server_port, self._server_url)

        self._current_command_type = None
        self._current_command_body = None

        self._lock = lock

        self.running = True

    def run(self):
        """
        This is the main method of an updater.
        It checks if there`re any new commands on the server
        and in case if there are it returns these commands
        as self._current_commnad_type & self._current_command_body.
        """
        while self.running:
            data = self._server_connection.GET_request(True, 0)
            if data['type'] != 'none':
                logger.debug('Received data {}'.format(data))
                self._lock.acquire()
                try:
                    self._current_command_type = data['type']
                    self._current_command_body = data['command']
                    logger.info('Command received: {} : {}'.format(
                        data['type'], data['command']))
                finally:
                    self._lock.release()
            else:
                pass
            time.sleep(config['output_update_frequency'])

    def reset(self):
        """
        Just reset all values.
        """
        self._lock.acquire()
        self._current_command_body = None
        self._current_command_type = None
        self._lock.release()

    def get_state(self):
        """
        Return current values. Pure try to provide
        incapsulation.
        """
        return self._current_command_type, self._current_command_body


class OutputInterface:
    def __init__(self):
        """
        This constructor function initializes a layout of the Arius output
        module but doesn`t displays it on the screen.

        Firstly, it creates a new app and detects screens configuration.
        Then, QGridLayout is created and its appearance is configured: margins
        and spaces between elements is set to 0.

        After that, we create three QWebViews: one for our main content view and
        two others for header and footer views.

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
        self._app = QtWidgets.QApplication(sys.argv)
        self._app.setStyle("Fusion")
        self._get_screen_height()

        self._layout = QGridLayout()  # create a main view of an app
        self._layout.setSpacing(0)  # and do some design settings
        self._layout.setContentsMargins(0, 0, 0, 0)

        self._main_browser = QWebView()  # create a main content view
        # and initialize zoom factor variable which will be used to control
        # zoom
        main_page = FakeBrowser(self)
        self._main_browser.setPage(main_page)
        self._zoom_factor = 1

        self._top_browser = QWebView()  # and create top and bottom views
        self._bottom_browser = QWebView()

        self._top_browser_height = config[
            'output_header_height'] * self._screen_height  # calculate views sizes
        self._bottom_browser_height = config[
            'output_footer_height'] * self._screen_height

        self._top_browser.setMaximumHeight(
            self._top_browser_height)  # and assign them to the views
        self._top_browser.setMinimumHeight(self._top_browser_height)

        self._bottom_browser.setMaximumHeight(self._bottom_browser_height)
        self._bottom_browser.setMinimumHeight(self._bottom_browser_height)

        self._top_browser.page().mainFrame().setScrollBarPolicy(
            QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)  # remove the scroll bars
        # self._main_browser.page().mainFrame().setScrollBarPolicy(QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)
        self._bottom_browser.page().mainFrame().setScrollBarPolicy(
            QtCore.Qt.Vertical, QtCore.Qt.ScrollBarAlwaysOff)

        self._top_browser_load_url(
            config['output_browser_top_page'])  # load default design
        self._bottom_browser_load_url(config['output_browser_bottom_page'])

        self._main_browser.settings().setAttribute(
            QWebSettings.DeveloperExtrasEnabled, True)  # enable console
        self._main_browser.settings().setAttribute(
            QWebSettings.PluginsEnabled, True)  # enable plugins
        QWebSettings.setObjectCacheCapacities(0, 0, 0)  # disable caching

        self._layout.addWidget(self._top_browser, 1, 0)  # set views positions
        self._layout.addWidget(self._main_browser, 2, 0)
        self._layout.addWidget(self._bottom_browser, 3, 0)

        # create a RLock object to syncronyze threads.
        self._lock = threading.RLock()
        # and create an updater object
        self._updater = OutputUpdater(self._lock)

        self._updater.start()  # which is ran in another non-blocking stream

        self.timeoutTimer = QTimer()  # create a timer to check for commands
        tCallback = functools.partial(
            self._handle_command)  # set a timer`s function
        self.timeoutTimer.timeout.connect(tCallback)
        self.timeoutTimer.start(
            config['output_update_frequency'])  # and start it

        # as no data is displayed on the main view - curent content type is
        # None
        self._cur_filetype = None

        self._speaker = None

    def run(self):
        """
        This method is called to show the output module window
        after initializing all views in __init__.
        """
        self._main_window = QWidget()  # create a window as a QWidget
        self._main_window.setLayout(self._layout)  # assign a layout to it
        self._main_window.showFullScreen()  # set full screen enabled
        self._main_window.show()  # and finally, show the window
        # and set a trigger to exit the app, as window is closed
        sys.exit(self._app.exec_())
        logger.info('Finished')

    def _handle_command(self):
        """
        This is a method called by an updater timer each given interval of time.
        It checks updater object and in case if there`s some new command it proceeds it.
        """
        command = self._updater.get_state()  # get a new command
        if command[0] != 'none' and command[0] != None:  # if there`s a command, handle it
            logger.info('Handling command {}'.format(command))

            self._updater.reset()  # clear the updater object command buffer

            # Commands for opening all types of content are handled by
            # calling of _load_content method with specified content type.

            if command[0] == 'OPEN_PDF':
                self._load_content('local_pdf', command[1])
            elif command[0] == 'OPEN_URL':
                self._load_content('external_url', command[1])
            elif command[0] == 'OPEN_LOCAL_PAGE':
                self._load_content('local_url', command[1])
            elif command[0] == 'OPEN_VIDEO':
                self._load_content('local_video', command[1])

            # Command to open a system scren (e.g. {'type': 'OPEN_SCREEN', 'command':'OPEN_IDLE'})
            # will be proceeded by sending a 'command' to a _load_screen method, which does futher
            # work.

            elif command[0] == 'OPEN_SCREEN':
                self._load_screen(command[1])

            # Zoom commands are handled each with its own method.

            elif command[0] == 'ZOOM_IN':
                self._main_browser_zoom_in()
            elif command[0] == 'ZOOM_OUT':
                self._main_browser_zoom_out()
            elif command[0] == 'ZOOM_NONE':
                self._main_browser_reset_zoom()

            # as well as scroll.

            elif command[0] == 'SCROLL_DOWN':
                self._main_browser_scroll_down()
            elif command[0] == 'SCROLL_UP':
                self._main_browser_scroll_up()

            # Following two commands are responsible for playing
            # video and pausing it. As a second part of the command
            # name of the video file should be given.

            elif command[0] == 'PLAY':
                self._video_play()
            elif command[0] == 'PAUSE':
                self._video_pause()

            # and these two are for text-to-speech
            # The 'command' body should be a text you
            # you want to hear.

            elif command[0] == "SPEAK":
                self._speak_text(command[1])
            elif command[0] == "STOP_SPEAK":
                self._speak_stop()
            else:
                logger.info('command not recognized {}'.format(command))
        else:
            pass

    def _get_screen_height(self):
        """
        This method is used to get dimensions of user`s screen.
        To do this is uses system utilite 'xrandr' via subprocess module,
        which is not very nice way, however we didn`t find
        anything better.
        """
        output = subprocess.Popen('xrandr | grep "\*" | cut -d" " -f4',
                                  shell=True, stdout=subprocess.PIPE).communicate()[0]
        output = [int(val) for val in output.split('x')]
        # logger.debug('Screen dimensions are: {} x {}'.format(output[0], output[1]))
        self._screen_height = output[1]
        self._screen_width = output[0]
        return output[0], output[1]

    def _load_screen(self, screen_type):
        """
        This method is responsible for opening system
        Arius screens. It receives a type of screen,
        server wants to open and then displays it on
        the main content view.
        """
        self._main_browser_reset_zoom()  # set zoom level to 1 in case if previous page was zoomed
        # this a default path to the arius server
        url = 'http://' + config['flask_server_address'] + \
            ':' + config['flask_server_port']
        if screen_type == 'IDLE':  # and here in depend of type of the required screen
            # we set the last path of the URL to the exact screen
            url = url + config['flask_server_idle_address']
        elif screen_type == 'ERROR':
            url = url + config['flask_server_error_address']
        elif screen_type == 'SEARCH':
            url = url + config['sflask_server_search_address']
        else:  # and if the target screen wasn`t recognized we can also handle it
            logger.info('WRONG SCREEN TYPE: {}'.format(screen_type))
        logger.debug(
            'Opening {} screen on following address {}'.format(screen_type, url))
        self._main_browser.load(QUrl(url))

    def _custom_ua(self, url):
        """
        This function returns a custom user agent data
        which is stored in config.py file as 'output_user_agent'
        """
        return config['output_user_agent']

    def _load_content(self, content_type, content):
        """
        This method is for displaying some content of
        such types: local web pages, remote web pages,
        local pdf`s, local videos.

        It should be called like in the following example
        to work correctly:
        self._load_content('local_video', 'some_video.mp4')
        """
        self._main_browser_reset_zoom()  # reset zoom
        if content_type == 'local_url':
            source = 'file://' + content  # simply open the file by its path
            # specify type of currently opened file for zoom and scroll methods
            self._cur_filetype = "webpage"
        elif content_type == 'external_url':
            self._cur_filetype = "webpage"
            # no needs required as, link should be given in
            # 'http://yoursite.com/yourpage'
            source = content
        elif content_type == 'local_pdf':
            # to render PDF`s we use PDF.js, so we open its page and send it a
            # path for the target file.
            source = "file://" + \
                config['root_dir'] + \
                config['output_data_pdf_viewer'] + "?file=" + content
            self._cur_filetype = "pdf"
        elif content_type == 'local_video':
            # in case of opening local videos we need to modify the path to the video in the source code of
            # the videoplayer, so don`t die after reading this code. It works just in the same style as other
            # filetypes, but in a very weird way.
            self._cur_filetype = "video"
            source = config['root_dir'] + config['output_videoplayer_path']
            html = open(source, "rb").read()
            open(source, "r+").write(html[:html.find("src=") + 5] +
                                     content + html[html.find("\"", html.find("src=") + 5):])
            source = "file:///" + source

        # Set a custom user agent to avoid message about deprecated version of browser

        self._main_browser.page().userAgentForUrl = self._custom_ua

        logger.info('Loading data on address: {}'.format(source))

        # Create a request to be able to set user-agent data. Without
        # it, it`s impossible to customize request data.
        request = QNetworkRequest()
        request.setUrl(QUrl(source))
        request.setRawHeader("USER-AGENT", config['output_user_agent'])

        # and finally load the result
        self._main_browser.load(request)

    def _top_browser_load_url(self, url):
        """
        This method just loads a given URL in the top content view.
        URL must contain protocol and the address.
        e.g. http://placehold.it/400x200
        or
        file://data/somepage.html
        """
        logger.info('Loading {} to the top content view.'.format(url))
        self._top_browser.load(QUrl(url))

    def _bottom_browser_load_url(self, url):
        """
        This method just loads a given URL in the bottom content view.
        URL must contain protocol and the address.
        e.g. http://placehold.it/400x200
        or
        file:
        """
        logging.info('Loading {} to the bottom content view.'.format(url))
        self._bottom_browser.load(QUrl(url))

    def _main_browser_scroll_down(self):
        """
        This method is called to smoothly scroll the page down. In
        dependence of the current content type if provides different
        implementations of scroll, but generally it gives the same result.
        """
        logger.debug('Scrolling main content view down')
        scroll_js = open("scroll.js", "r").read()
        self._main_browser.page().mainFrame().evaluateJavaScript(scroll_js)
        if self._cur_filetype == "pdf":
            self._main_browser.page().mainFrame().evaluateJavaScript(
                "smooth_scroll_by(PDFViewerApplication.pdfViewer.container, 300, 1000);")
        elif self._cur_filetype == "webpage":
            self._main_browser.page().mainFrame().evaluateJavaScript(
                "smooth_scroll_by(document.body, 300, 1000);")

    def _main_browser_scroll_up(self):
        """
        This method is called to smoothly scroll the page up. In
        dependence of the current content type if provides different
        implementations of scroll, but generally it gives the same result.
        """
        logger.debug('Scrolling main content view down')
        scroll_js = open("scroll.js", "r").read()
        self._main_browser.page().mainFrame().evaluateJavaScript(scroll_js)
        if self._cur_filetype == "pdf":
            self._main_browser.page().mainFrame().evaluateJavaScript(
                "smooth_scroll_by(PDFViewerApplication.pdfViewer.container, -300, 1000);")
        elif self._cur_filetype == "webpage":
            self._main_browser.page().mainFrame().evaluateJavaScript(
                "smooth_scroll_by(document.body, -300, 1000);")

    def _main_browser_zoom_in(self):
        """
        This methoud simply zooms main content view in. It works
        well with all content types.
        """
        logger.debug('Zooming main content view in')
        self._zoom_factor += .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _main_browser_reset_zoom(self):
        """
        This method sets zoom level of the main content view to the default level.
        It should be called before loading a new page or in order to cancel any zoom
        changes.
        """
        logger.debug('Resetting zoom in the main content view')
        self._zoom_factor = 1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _main_browser_zoom_out(self):
        """
        This methoud simply zooms main content view out. It works
        well with all content types.
        """
        logger.debug('Zooming main content view ouy')
        self._zoom_factor -= .1
        self._main_browser.page().mainFrame().setZoomFactor(self._zoom_factor)

    def _speak_text(self, input_text):
        """
        This method is used to provide text-to-speech syntesizer for voice output.
        As a back-end of this method Mary TTS is used.
        Voices can be configured through config.py quit easy.
        """
        logger.info('Speaking following text {}'.format(input_text))
        voice = config["default_voice"]
        if self._speaker is None:  # if there wasn`t no tts requests before, create a TTS client
            self._speaker = Speaker(config[voice], config[
                                    "marytts_host"], config["marytts_port"])
        # otherwise just stop previous speaking session (if Arius isn`t
        # speaking at the moment, nothing will crash)
        else:
            self._speaker.stop()
        # and send given text as a tts request.
        self._speaker.speak(input_text)

    def _speak_stop(self):
        """
        This method simply stops current voice output.
        """
        logger.info('Stop speaking')
        self._speaker.stop()

    def _video_play(self):
        """
        This method is used to begin playing video on the current page.
        It should be run only if current content type is 'video'.
        """
        logger.debug('Playing video')
        if self._cur_filetype == 'video':
            script_js = """video=document.getElementById("videoplayer"); video.play()"""
            self._main_browser.page().mainFrame().evaluateJavaScript(script_js)

    def _video_pause(self):
        """
        This method is used to pause currently playing video on the page.
        It should be run only if current content type is 'video'.
        """
        logger.debug('Video paused')
        if self._cur_filetype == 'video':
            script_js = """video=document.getElementById("videoplayer"); video.pause()"""
            self._main_browser.page().mainFrame().evaluateJavaScript(script_js)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('-v', '--verbose', action='store_true',
                        dest='en_verbose', help='Enables terminal output of current commands')
    parser.add_argument('-d', '--debug', action='store_true', dest='en_debug',
                        help='Enables terminal output of all internall processes')

    args = parser.parse_args()

    logger = logging.getLogger("Output")

    logger.propagate = False
    ch = logging.StreamHandler()

    if args.en_verbose:
        logging.basicConfig(level=logging.INFO)
    elif args.en_debug:
        logging.basicConfig(level=logging.DEBUG)
    else:
        logging.basicConfig(level=logging.CRITICAL)

    formatter = logging.Formatter(
        "[%(name)s][%(asctime)s][%(levelname)s] - %(message)s")
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    ui = OutputInterface()
    ui.run()
