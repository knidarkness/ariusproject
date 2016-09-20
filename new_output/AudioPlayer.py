import threading
import pyaudio
from pydub.audio_segment import AudioSegment
from pydub.utils import make_chunks


def play(chunk, stream):
    """
    Replace standart pydub.playback.play.
    We avoid opening and closing streams for each audiosegment
    """
    stream.write(chunk._data)


class AudioPlayer(threading.Thread):
    """
    Class is responsible for playing background music and speech.
    """

    def __init__(self, speech_volume=0, music_volume=0, controller):
        """
        Volume argument show increasing(decreasing) of original audiofile by dB.
        """
        self._speech_volume = speech_volume
        self._music_volume = music_volume
        self._controller = controller
        self._is_speaking = False
        self._is_music = False
        self._is_running = True
        self._pyadio_object = pyaudio.PyAudio()
        self._stream = self._pyadio_object.open(format=self._pyadio_object.get_format_from_width(2),
                                                channels=1,
                                                rate=48000,
                                                output=True)

    def run(self):
        """
        It plays chunks of speech and/or music if needed.
        """
        while self._is_running:

            if not self._speaking_chunks:
                next_phrase = self._output.get_next_speech_phrase():
                if not next_phrase:
                    self._is_speaking = False
                else:
                    self.play_speech(next_phrase)

            if self._is_music and self._is_speaking:
                music_chunk = self._music_chunks.pop(0) + self._music_volume
                self._music_chunks.append(music_chunk)
                speech_chunk = self._speaking_chunks.pop(
                    0) + self._speech_volume
                # if we have music and speech at the same time we combine it
                play_chunk = music_chunk.overlay(speech_chunk, position=0)

            elif self._is_music:
                # we loop background music
                # we play the first chunk and make it the last one
                music_chunk = self._music_chunks.pop(0)
                self._music_chunks.append(music_chunk)
                play_chunk = music_chunk + self._music_volume
            elif self._is_speaking:
                # we play the first chunk of speech and then remove it
                play(self._speaking_chunks.pop(0))
                play_chunk = speech_chunk + self._speech_volume

            play(play_chunk, self._stream)

    def play_music(self, music_file):
        """
        It open the audio and make the "queue" of chunks from it
        """
        self._is_music = True
        self._music_chunks = make_chunks(
            AudioSegment.from_wav(music_file), 1000)

    def play_speech(self, speech_file):
        """
        It open the audio and make the "queue" of chunks from it
        """
        self._is_speaking = True
        self._speaking_chunks = make_chunks(
            AudioSegment.from_wav(speech_file), 1000)

    def get_speech_volume(self):
        """
        It returns the number of dB we modify the orinal audio with
        """
        return self._speech_volume

    def get_music_volume(self):
        """
        It returns the number of dB we modify the orinal audio with
        """
        return self._music_volume

    def set_speech_volume(self, volume):
        """
        It set new volume for the speech.
        Increase or decrease volume by n dB.
        To mute it completely you can use a huge negative number.
        """
        self._speech_volume = volume

    def set_music_volume(self, volume):
        """
        It set new volume for the music.
        Increase or decrease volume by n dB.
        To mute it completely you can use a huge negative number.
        """
        self._music_volume = volume

    def stop_music(self):
        """
        It completely stops the playing of the music.
        (To pause it is better to mute completely)
        """
        self._is_music = False
        self._music_chunks = None

    def stop_speech(self):
        """
        It completely stops the speaking.
        """
        self._is_speaking = False
        self._speaking_chunks = None
