
import argparse
import json
import time
import sys
sys.path.append("../")
from client import RESTClient
from configure import ConstExtractor

Extractor = ConstExtractor()

host = Extractor.getValue('flask_server_address')
port = Extractor.getValue('flask_server_port')
input_url = Extractor.getValue('flask_server_input_client')

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--filename', default='none', help="Send first phrases from file")
args = parser.parse_args()

input_client = RESTClient(host, port, input_url)

if args.filename != 'none':
    with open(args.filename) as speech_file:
        speech_dictionary = json.load(speech_file)
    for key in speech_dictionary:
        data = {'speech_text': speech_dictionary[key]['speech_text']}
        response = input_client.send_data_in_POST(data, True, 0)
        print response
        time.sleep(speech_dictionary[key]['time_sleep'])


while True:
    print "Write phrase: "
    speech_text_manual = raw_input()
    data = {'speech_text': speech_text_manual}
    response = input_client.send_data_in_POST(data, True, 0)
    print response
