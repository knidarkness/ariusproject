import threading
from CommandReceiver import CommandReceiver
from BrowserClient import BrowserClient
from AudioPlayer import AudioPlayer
from TTSClient import TTSClient
from Command import Command
from config import config
from logger import Logger
from time import sleep


logger = Logger("OutputController")


class OutputController(threading.Thread):
    """
    It is class which control audioplayer, tts_client and browser depends on
    command from command receiver.
    """

    def __init__(self, fullscreen, size, flask_host=config["output_server_host"], flask_port=config["output_server_port"],
                 flask_url=config["output_server_url"], voice_hash=config["default_voice"], mary_host=config["marytts_host"],
                 mary_port=config["marytts_port"]):
        """
        Here we create objects of main components of Output,
        which are controled by this class.

        Also we create "_is_running" flag to be able to stop running
        and Rlock object to lock self and threads of controlled object when it is necessary
        """
        self._lock = threading.Rlock()

        self._receiver = CommandReceiver(flask_host, flask_port, flask_url, self._lock)
        self._browser = BrowserClient(fullscreen, size)
        self._tts = TTSClient(voice_hash, mary_host, mary_port, self)
        # lists for controlling text to speech and its playing
        self.tts_phrases_queue = []
        self.text_to_say = []

        self._is_running = True
        self._current_filetype = None
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
        while self._is_running:
            if self._receiver.is_state():

                command = Command(self._receiver.get_state())
                self._handle_command(command)

                # turn on music when video is stopped 
                # (music is off while video is playing)
                if not self._is_video_playing and not self._muted:
                    self._set_music_volume(self._music_volume)

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
            self._current_filetype = "screen"
            self._load_content("screen", command.body)
        elif command.type == 'ZOOM_IN':
            self._zoom(0.2)
            self._center()
        elif command.type == 'ZOOM_OUT':
            self._zoom(-0.2)
        elif command.type == 'ZOOM_NONE':
            self._reset_zoom()
        elif command.type == 'SCROLL_DOWN':
            self._vertical_scroll(300, 1000, self._current_filetype)
        elif command.type == 'SCROLL_UP':
            self._vertical_scroll(-300, 1000, self._current_filetype)
        elif command.type == 'CONTINIOUS_SCROLL_UP':
            pass
        elif command.type == 'CONTINIOUS_SCROLL_DOWN':
            pass
        elif command.type == 'STOP_SCROLL':
            pass
        elif command.type == 'PLAY':
            self._play_video()
        elif command.type == 'PAUSE':
            self._video_pause()
        elif command.type == 'VOLUME_UP':
        	if self._current_filetype == "video" and not self._output.video_stopped:
        		self._video_volume_up(0.2)
        	else:
                self._music_volume += 1
                self._speech_volume += 1
                self._set_music_volume(self._music_volume)
                self._set_voice_volume(self._speech_volume)
        elif command.type == 'VOLUME_DOWN':
        	if self._current_filetype == "video" and not self._output.video_stopped:
        		self._video_volume_up(-0.2)
        	else:
                self._music_volume -= 1
                self._speech_volume -= 1
                self._set_music_volume(self._music_volume)
                self._set_voice_volume(self._speech_volume)
        elif command.type == "SPEAK":
            self._say_text(command.body)
        elif command.type == "STOP_SPEAK":
            self._stop_speech()
        elif command.type == 'MUTE':
            self._muted = True
            self._music_volume = self._get_music_volume()
            self._speech_volume = self._get_voice_volume()
            self._set_music_volume(-120)
            self._set_voice_volume(-120)
        elif command.type == 'UNMUTE':
            self._muted = False
            self._set_music_volume(self._music_volume)
            self._set_voice_volume(self._speech_volume)
        else:
        	logger.info("Command isn't recognized {}".format(Command))

    def _say_text(self, text):
    	"""
    	Here we make our speech lists empty and then prepare
    	text to say list for TTSClient
    	"""
    	self._lock.acquire()
    	self.text_to_say = []
    	self.tts_phrases_queue = []
    	# we split sentences for tts
    	list_of_sentences = [tesx.split('. ')]
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

    def _pause_video(self):
    	"""
    	We generate js-command to pause video and send it to the browser for executing
    	"""
        if self._current_filetype == 'video':
            script_js = """video=document.getElementById("arius_videoplayer"); video.pause()"""
            self._browser.execute_js(script_js)

    def _play_video(self):
    	"""
    	We generate js-command to play video and send it to the browser for executing
    	"""
        if self._current_filetype == 'video':
            script_js = """video=document.getElementById("arius_videoplayer"); video.play()"""
            self._browser.execute_js(script_js)

    def _is_video_playing(self):
    	"""
    	We generate js-command to get know if video is playing
    	and send it to the browser for executing. Then return the result
    	"""
    	if self._current_filetype == 'video':
    		pass
    	else:
    		return False

    def _vertical_scroll(self, px_length, ms_time):
    	"""
    	We generate js-command to scroll and send it to the browser for executing
    	"""
    	scroll_js = open("scroll.js", "r").read()
        self.browser.execute_js(scroll_js)
        if self._cur_filetype == "pdf":
            string_js = ','.join(['smooth_scroll_by(PDFViewerApplication.pdfViewer.container', str(px_length), str(ms_time) + ');'])
            self.browser.execute_js(string_js)
        elif self._cur_filetype == "webpage":
            string_js = ','.join(['smooth_scroll_by(document.body', str(px_length), str(ms_time) + ');'])
            self.browser.execute_js(string_js)

    def _center(self):
    	"""
    	We generate js-command to center the document page and send it to the browser
    	"""
    	if self._current_filetype == "pdf":
    		pass

    def _zoom(self, zoom_factor):
    	"""
    	We use the browser method for zooming
    	"""
    	if self._current_filetype in ["pdf", "webpage"]:
    		self.browser.zoom(zoom_factor)
   	def _reset_zoom(self):
    	"""
    	We use the browser method for reseting zoom
    	"""
    	self._browser.reset_zoom()

    def _get_speech_volume(self):
    	"""
    	We use AudioPlayer object to get know speech volume increment/decrement
    	"""
		return self.audioplayer.get_speech_volume()

   	def _get_music_volume(self):
    	"""
    	We use AudioPlayer object to get know music volume increment/decrement
    	"""
		return self.audioplayer.get_music_volume()

    def _set_speech_volume(self, volume):
    	"""
    	We use AudioPlayer object to get know speech volume increment/decrement
    	"""
    	self.audioplayer.set_speech_volume(volume)

   	def _set_music_volume(self, volume):
    	"""
    	We use AudioPlayer object to get know music volume increment/decrement
    	"""
    	self.audioplayer.set_music_volume(volume)

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
        if content_type == 'local_url':
            source += config['flask_server_local_page_client'] + content 
            self._current_filetype = "webpage"
        elif content_type == 'external_url':
            self._current_filetype = "webpage"
            source = content
        elif content_type == 'local_pdf':
            source += config['flask_server_local_page_client'] + content
            self._currrent_filetype = "pdf"
        elif content_type == 'local_video':
            source = config['flask_server_video_addr_client'] + content
            self._currrent_filetype = "video"
        elif content_type == "screen":
        	source += config["flask_screen_address"][content]
       	else:
       		source += config["flask_screen_address"]["ERROR"]

        # and finally load the result
        self._browser.load_url(source)

    def get_next_speech_phrase(self):
        """
        Return path to the next speech phrase file if it exist
        """
        if self.tts_phrases_queue:
            return self.tts_phrases_queue.pop(0)
        else:
            return False


    
