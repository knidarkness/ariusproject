import argparse
import json
import time
import random
import sys
sys.path.append("../")
from client import RESTClient
from config import config

host = config['flask_server_address']
port = config['flask_server_port']
input_url = config['flask_server_input_client']

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--filename', default='none',
                    help="Send first phrases from file")
args = parser.parse_args()

input_client = RESTClient(host, port, input_url)

activation = ['ok arius']
search_request = ['what is abiliton',
                  'data science', 'mylko', 'iot', 'softserve']
commands = ['zoom in', 'enlagre bitch', 'zoom out',
            'scroll down now!', 'could you please scroll up']
cancel = ['bye', 'thanks']

activated = False

while True:
    request = []
    choice = random.random()
    delay = (random.random() * 10) + 1
    if not activated:
        if choice < 0.5:
            request.append(random.choice(activation))
            request.append(random.choice(search_request))
            request = ' '.join(request)
            activated = True
        else:
            request = random.choice(search_request)
    else:
        if choice < 0.2:
            request = random.choice(search_request)
        elif choice < 0.8:
            request = random.choice(commands)
        else:
            request = random.choice(cancel)
            activated = False
    print 'Sending following request "{}" and waiting {} seconds'.format(request, delay)
    data = {'speech_text': request}
    response = input_client.send_data_in_POST(data, True, 0)
    print 'Received following response from server: "{}"'.format(response)
    time.sleep(delay)
