import threading
import httplib2
from urllib import urlencode


class TTSClient(threading.Thread):
    """
    Process text needed to be said by Arius.
    """

    def __init__(self, voice_hash, mary_host, mary_port, output):
        """
        Voice hash has format described at "mary_host:mary_port/documentation.html"

        This class need to have access to output class to update tts_phrases_queue,
        as we process not the whole text but parts of it to process text while player
        is playing audio of generated speech
        """
        super(TTSClient, self).__init__()
        self._voice_config = voice_hash
        self._host = mary_host
        self._port = mary_port
        self._output = output
        self._mary_server = httplib2.Http()
        self._is_running = True

    def run(self):
        """
        Get text to process and then add result file path to the phrases queue
        """
        while self._is_running:
            self._process_text(self._get_text_to_process())

    def _get_text_to_process(self):
        """
        Get text to process from the output
        """
        if self._output.text_to_say:
            return self._output.text_to_say.pop(0)
        else:
            return None

    def _process_text(self, text):
        """
        Send request to the server and add path to the file to the output queue for playing
        """
        if text is None:
                # there is no text to process
            pass
        else:
            query = self._voice_config
            query["INPUT_TEXT"] = text
            resp, content = self._mary_server.request(
                "http://%s:%s/process?" % (self.host, self.port), "POST", query)

            if (resp["content-type"] == "audio/x-wav"):
                filepath = "/tmp/speech_track" + \
                    len(self._output.phrases_queue)
                # Write the wav file
                f = open(filepath + ".wav", "wb")
                f.write(content)
                f.close()
                if type(self._output.phrases_queue) == list:
                    self._output.phrases_queue.append(filepath)
                else:
                    # it means that output received command to stop speaking
                    # current text
                    pass
            else:
                raise Exception(content)
