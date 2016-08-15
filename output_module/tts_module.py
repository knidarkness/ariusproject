import sys
sys.path.append('../ariusproject/server')
from client import RESTClient
from urllib import urlencode
import httplib2
# Mary server informations
mary_host = "localhost"
mary_port = "59125"


# To play wave files
import pygame
import math # For ceiling


def tts_mary(input_text):
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
    query = urlencode(query_hash)
    print("query = \"http://%s:%s/process?%s\"" % (mary_host, mary_port, query))

    # Run the query to mary http server
    h_mary = httplib2.Http()
    resp, content = h_mary.request("http://%s:%s/process?" % (mary_host, mary_port), "POST", query)

    #  Decode the wav file or raise an exception if no wav files
    if (resp["content-type"] == "audio/x-wav"):
    
        # Write the wav file
        f = open("/tmp/output_wav.wav", "wb")
        f.write(content)
        f.close()

        # Play the wav file
        pygame.mixer.init(frequency=16000) # Initialise the mixer
        s = pygame.mixer.Sound("/tmp/output_wav.wav")
        s.play()
        pygame.time.wait(int(math.ceil(s.get_length() * 1000)))
    
    else:
        raise Exception(content)


