from urllib import urlencode
import httplib2
# To play wave files
import pygame


class Speaker:
    def __init__(self, voice_hash, mary_host="localhost", mary_port="59125"):
        self.query_hash = voice_hash
        self.host = mary_host
        self.port = mary_port
        self.session = None

    def speak(self, input_text):
        self.query_hash["INPUT_TEXT"] = input_text
        query = urlencode(self.query_hash)
        # Run the query to mary http server
        h_mary = httplib2.Http()
        resp, content = h_mary.request("http://%s:%s/process?" % (self.host, self.port), "POST", query)

        #  Decode the wav file or raise an exception if no wav files
        if (resp["content-type"] == "audio/x-wav"):

            # Write the wav file
            f = open("/tmp/output_wav.wav", "wb")
            f.write(content)
            f.close()

            # Play the wav file
            pygame.mixer.init()  # Initialise the mixer
            s = pygame.mixer.Sound("/tmp/output_wav.wav")
            s.play()
            #raise Exception("finish")

        else:
            raise Exception(content)

    def stop(self):
        pygame.mixer.stop()


"""
    # Build the query
    query_hash = {"INPUT_TEXT":input_text,
                  "INPUT_TYPE":"TEXT", # Input text
                  "LOCALE":"en_GB",
                  "VOICE":"dfki-poppy", # Voice informations  (need to be compatible)
                  "OUTPUT_TYPE":"AUDIO",
                  "AUDIO":"WAVE", # Audio informations (need both)
                  "effect_Robot_selected": "on",
                  "effect_Robot_parameters": "amount:100.0;",
    }
"""
