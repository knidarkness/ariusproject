import threading
from CommandReceiver import CommandReceiver
from PyQt5.QtCore import pyqtSignal
from AudioPlayer import AudioPlayer
from TTSClient import TTSClient
from Command import Command
from config import config
from Thread import Thread
from time import sleep

import sys
sys.path.append("../")
from logger import Logger
logger = Logger("Output[OutputController]")


class OutputController(Thread):
    """
    It is class which control audioplayer, tts_client and browser depends on
    command from command receiver.
    """

    zooming = pyqtSignal(float)
    js_execution = pyqtSignal(str)
    load_url = pyqtSignal(str)

    def __init__(self, flask_host=config["output_server_host"], flask_port=config["output_server_port"],
                 flask_url=config["output_server_url"], voice_hash=config["default_voice"], mary_host=config["marytts_host"],
                 mary_port=config["marytts_port"]):
        """
        Here we create objects of main components of Output,
        which are controled by this class.

        Also we create "_is_running" flag to be able to stop running
        and Rlock object to lock self and threads of controlled object when it is necessary
        """
        super(OutputController, self).__init__()
        self._lock = threading.RLock()

        self._receiver = CommandReceiver(flask_host, flask_port, flask_url, self._lock)
        self._tts = TTSClient(voice_hash, mary_host, mary_port, self)
        self._audioplayer = AudioPlayer(controller=self)

        # lists for controlling text to speech and its playing
        self.tts_phrases_queue = []
        self.text_to_say = []
        self._is_video_playing = False
        self._is_running = True
        self._cur_filetype = None
        self._zoom_factor = 1
        # it saves volume to set it after turning off mute
        # and to know how to increase/decrease it
        self._speech_volume = 0
        self._music_volume = 0
        self._muted = False

    def run(self):
        """
        It uses command receiver to get new command and then handle it.
        Wait a little bit not to cause problem with server and not to load computer
        """
        self._receiver.start()
        self._tts.start()
        self._audioplayer.start()
        self._start_playing_music()
        while self._is_running:
            if self._receiver.is_state():
                received_command = self._receiver.get_state()
                if received_command != None:
                    self._handle_command(received_command)

                    # turn on music when video is stopped
                    # (music is off while video is playing)
                    # if not self._is_video_playing and not self._muted:
                    #    print 'BLABLABLA', self._is_video_playing
                    #    self._set_music_volume(self._music_volume)

            else:
                pass
            sleep(.05)

    def _handle_command(self, command):
        """
        This method call the methods of the Output depends on command tyoe.
        """
        logger.info('Handling command {}'.format(command))
        if command.type == "OPEN_PDF":
            self._load_content('local_pdf', command.body)
        elif command.type == 'OPEN_URL':
            self._load_content('external_url', command.body)
        elif command.type == 'OPEN_LOCAL_PAGE':
            self._load_content('local_url', command.body)
        elif command.type == 'OPEN_VIDEO':
            self._load_content('local_video', command.body)
        elif command.type == 'OPEN_SCREEN':
            self._cur_filetype = "screen"
            self._load_content("screen", command.body)

        elif command.type == 'ZOOM_IN':
            self._zoom_in()
        elif command.type == 'ZOOM_OUT':
            self._zoom_out()
        elif command.type == 'NO_ZOOM':
            self._reset_zoom()

        elif command.type == 'NEXT_PAGE':
            self._next_page()
        elif command.type == 'PREV_PAGE':
            self._prev_page()

        elif command.type == 'SCROLL_DOWN':
            self._scroll_down()
        elif command.type == 'SCROLL_UP':
            self._scroll_up()
        elif command.type == 'CONTINIOUS_SCROLL_UP':
            pass
        elif command.type == 'CONTINIOUS_SCROLL_DOWN':
            pass
        elif command.type == 'STOP_SCROLL':
            pass
        elif command.type == 'PLAY':
            self._mute_music()
            self._mute_speech()
            self._play_video()
        elif command.type == 'PAUSE':
            self._unmute_music()
            self._pause_video()
        elif command.type == 'VOLUME_UP':
            if self._cur_filetype == "video" and not self._output.video_stopped:
                self._video_volume_up()
            else:
                self._music_volume += 1
                self._speech_volume += 1
                self._set_music_volume(self._music_volume)
                self._set_speech_volume(self._speech_volume)
        elif command.type == 'VOLUME_DOWN':
            if self._cur_filetype == "video" and not self._output.video_stopped:
                self._video_volume_down()
            else:
                self._music_volume -= 1
                self._speech_volume -= 1
                self._set_music_volume(self._music_volume)
                self._set_speech_volume(self._speech_volume)
        elif command.type == "SPEAK":
            self._say_text(command.body)
        elif command.type == "STOP_SPEAK":
            self._stop_speech()
        elif command.type == 'MUTE':
            self._mute_speech()
            self._mute_music()
        elif command.type == 'UNMUTE':
            self._unmute_speech()
            self._unmute_music()
        else:
            logger.info("Command isn't recognized {}".format(Command))

    def _mute_speech(self):
        self._speech_volume = self._get_speech_volume()
        self._set_speech_volume(0)

    def _unmute_speech(self):
        self._set_speech_volume(self._speech_volume)

    def _mute_music(self):
        logger.debug('BABALALBALABLA MUTE -====')
        self._muted = True
        self._music_volume = self._get_music_volume()
        self._set_music_volume(0)

    def _unmute_music(self):

        logger.debug('BABALALBALABLA __ --__ UNMUTE')
        self._muted = False
        self._set_music_volume(self._music_volume)

    def _say_text(self, text):
        """
        Here we make our speech lists empty and then prepare
        text to say list for TTSClient
        """
        self._lock.acquire()
        self.text_to_say = []
        self.tts_phrases_queue = []
        # we split sentences for tts
        list_of_sentences = text.split('. ')
        # and then add '.' to each to improve quality of tts
        self.text_to_say = [sentence + "." for sentence in list_of_sentences]
        self._lock.release()

    def _stop_speech(self):
        """
        We just make speech list empty and it leads to silence
        """
        self._lock.acquire()
        self.text_to_say = []
        self.tts_phrases_queue = []
        self._lock.release()

    def _start_playing_music(self):
        """
        """

        logger.debug('BAB=====START')
        self._audioplayer.play_music(config["background_music"])

    def _pause_video(self):
        """
        We generate js-command to pause video and send it to the browser for executing
        """
        self._is_video_playing = False

        if self._cur_filetype == 'video':
            script_js = """video=document.getElementById("arius_videoplayer"); video.pause()"""
            self.js_execution.emit(script_js)

    def _play_video(self):
        """
        We generate js-command to play video and send it to the browser for executing
        """
        self._is_video_playing = True
        if self._cur_filetype == 'video':
            script_js = """video=document.getElementById("arius_videoplayer"); video.play()"""
            self.js_execution.emit(script_js)

    def _scroll_down(self):
        """
        This method is called to smoothly scroll the page down. In
        dependence of the current content type if provides different
        implementations of scroll, but generally it gives the same result.
        """
        logger.debug('Scrolling main content view down')
        scroll_js = open("scroll.js", "r").read()
        self.js_execution.emit(scroll_js)
        if self._cur_filetype == "pdf":
            self.js_execution.emit("smooth_scroll_by(PDFViewerApplication.pdfViewer.container, 300, 1000);")
        elif self._cur_filetype == "webpage":
            self.js_execution.emit("smooth_scroll_by(document.body, 300, 1000);")

    def _scroll_up(self):
        """
        This method is called to smoothly scroll the page up. In
        dependence of the current content type if provides different
        implementations of scroll, but generally it gives the same result.
        """
        logger.debug('Scrolling main content view down')
        scroll_js = open("scroll.js", "r").read()
        self.js_execution.emit(scroll_js)
        if self._cur_filetype == "pdf":
            self.js_execution.emit("smooth_scroll_by(PDFViewerApplication.pdfViewer.container, -300, 1000);")
        elif self._cur_filetype == "webpage":
            self.js_execution.emit("smooth_scroll_by(document.body, -300, 1000);")

    def _zoom_in(self):
        """
        This methoud simply zooms main content view in. It works
        well with all content types.
        """
        logger.debug('Zooming main content view in')
        if self._cur_filetype == "pdf":
            string_js = """PDFViewerApplication.zoomIn();"""
            self.js_execution.emit(string_js)
        elif self._cur_filetype == "webpage":

            self._zoom_factor += .1
            self.zooming.emit(self._zoom_factor)

    def _reset_zoom(self):
        """
        This method sets zoom level of the main content view to the default level.
        It should be called before loading a new page or in order to cancel any zoom
        changes.
        """
        logger.debug('Resetting zoom in the main content view')
        if self._cur_filetype == "pdf":
            string_js = 'PDFViewerApplication.pdfViewer.currentScaleValue = "page-width"'
            self.js_execution.emit(string_js)
        elif self._cur_filetype == "webpage":
            self._zoom_factor = 1
            self.zooming.emit(self._zoom_factor)

    def _zoom_out(self):
        """
        This methoud simply zooms main content view out. It works
        well with all content types.
        """
        logger.debug('Zooming main content view out')
        if self._cur_filetype == "pdf":
            string_js = """PDFViewerApplication.zoomOut();"""
            self.js_execution.emit(string_js)
        elif self._cur_filetype == "webpage":
            self._zoom_factor -= .1
            self.zooming.emit(self._zoom_factor)

    def _next_page(self):
        logger.debug('Next page')
        script_js = """PDFViewerApplication.page++;"""
        self.js_execution.emit(script_js)

    def _prev_page(self):
        logger.debug('Previous page')
        script_js = """PDFViewerApplication.page--;"""
        self.js_execution.emit(script_js)

    def _center(self):
        """
        We generate js-command to center the document page and send it to the browser
        """
        if self._cur_filetype == "pdf":
            pass

    def _get_speech_volume(self):
        """
        We use AudioPlayer object to get know speech volume increment/decrement
        """
        return self._audioplayer.get_speech_volume()

    def _get_music_volume(self):
        """
        We use AudioPlayer object to get know music volume increment/decrement
        """
        return self._audioplayer.get_music_volume()

    def _set_speech_volume(self, volume):
        """
        We use AudioPlayer object to get know speech volume increment/decrement
        """
        self._audioplayer.set_speech_volume(volume)

    def _set_music_volume(self, volume):
        """
        We use AudioPlayer object to get know music volume increment/decrement
        """
        logger.debug('BABALALBALABLA')
        self._audioplayer.set_music_volume(volume)

    def _video_volume_up(self):
        """
        This method is used to increase volume.
        It should be run only if current content type is 'video'.
        """
        logger.debug('Increasing volume')
        if self._cur_filetype == 'video':
            script_js = """video=document.getElementById("arius_videoplayer"); video.volume+=0.2;"""
            self.js_execution.emit(script_js)

    def _video_volume_down(self):
        """
        This method is used to decrease volume.
        It should be run only if current content type is 'video'.
        """
        logger.debug('Decreasing volume')
        if self._cur_filetype == 'video':
            script_js = """video=document.getElementById("arius_videoplayer"); video.volume-=0.2;"""
            self.js_execution.emit(script_js)

    def _load_content(self, content_type, content):
        """
        This method is for displaying some content of
        such types: local web pages, remote web pages,
        local pdf`s, local videos.

        It should be called like in the following example
        to work correctly:
        self._load_content('local_video', 'some_video.mp4')
        """
        source = config['flask_server_home']
        self._reset_zoom()
        print content_type, content
        if content_type == 'local_url':
            source += config['flask_server_local_page_client'] + content
            self._cur_filetype = "webpage"
        elif content_type == 'external_url':
            self._cur_filetype = "webpage"
            source = content
        elif content_type == 'local_pdf':
            source += config['flask_server_local_page_client'] + content
            self._cur_filetype = "pdf"
        elif content_type == 'local_video':
            self._is_video_playing = True
            source += config['flask_server_video_addr_client'] + content
            self._cur_filetype = "video"
            self._mute_music()
        elif content_type == "screen":
            source += config["flask_server_screen_address"][content]
        else:
            source += config["flask_server_screen_address"]["ERROR"]

        # and finally load the result
        # self._browser.load_url(source)
        self.load_url.emit(source)

    def get_next_speech_phrase(self):
        """
        Return path to the next speech phrase file if it exist
        """
        if self.tts_phrases_queue:
            return self.tts_phrases_queue.pop(0)
        else:
            return False
