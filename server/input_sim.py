from client import RESTClient
import argparse
import json
import time

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--filename', default='none',  help="Send first phrases from file")
args = parser.parse_args()

input_client = RESTClient('127.0.0.1', 5000, '/input')

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
