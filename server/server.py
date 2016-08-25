"""
This is a server of the Arius project.

It can be run from command line with arguments '-d' or '--debug' to
enable debug mode, in which all messages received and sent by server will
be printed.

Also, if you want to see all connections made to server, you can run it
with '-v' or '--verbose' flags.
"""

from flask import Flask, jsonify, make_response, request, abort, render_template
import sys
import logging
sys.path.append("../")
from config import config
TAG = "[SERVER]"

app = Flask(__name__)
noise_available = {"status": "False"}
input_text = {"speech_text": "no updates"}
command = {
    "type": "none",
    "command": "none1"
}
command_queue = []


@app.errorhandler(404)
def not_found(err):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.errorhandler(400)
def not_recognized(err):
    return make_response(jsonify({'error': 'Not recognized command'}), 400)


@app.route(config['flask_server_input_noise'], methods=['POST'])
def noise_input():
    global noise_available
    noise_available["status"] = "True"
    if not request.json or "speech_text" not in request.json:
        abort(400)
    else:
        if app.debug:
            print TAG, "Here is Noise", app.debug
        return jsonify(request.json), 201


@app.route(config['flask_server_output_noise'], methods=['GET'])
def noise_output():
    global noise_available
    tmp_noise = noise_available
    noise_available["status"] = "False"
    return jsonify(noise_available)


@app.route(config['flask_server_input_client'], methods=['POST'])
def speech_text_input():
    global input_text
    if not request.json or 'speech_text' not in request.json:
        abort(400)
    else:
        input_text = {"speech_text": request.json['speech_text']}
        if app.debug:
            print TAG, input_text, app.debug
        return jsonify(input_text), 201


@app.route(config['flask_server_core_input_connection'], methods=['GET'])
def get_speech_text():
    global input_text
    tmp_text = input_text
    input_text = {"speech_text": "no updates"}
    return jsonify(tmp_text)


@app.route(config['flask_server_core_output_connection'], methods=['POST'])
def command_input():
    global command
    if app.debug:
        print TAG, request.json, app.debug
    if not request.json or not 'type' in request.json or 'command' not in request.json:
        abort(400)
    else:
        command = {
            'type': request.json['type'],
            'command': request.json['command']
        }
        if app.debug:
            print TAG, command, app.debug
        command_queue.append(command)
        return jsonify(command), 201


@app.route(config['flask_server_output_client'], methods=['GET'])
def get_command():
    global command_queue
    if command_queue:
        command = command_queue.pop(0)
    else:
        command = {
            "type": "none",
            "command": "none"
        }
    return jsonify(command)


@app.route(config['flask_server_idle_address'])
def idle():
    return render_template("idle.html", background=config["arius_screen_idle_background"])


@app.route(config['flask_server_error_address'])
def error():
    return render_template("error.html", background=config["arius_screen_error_background"])


@app.route(config['flask_server_search_address'])
def search():
    return render_template("search.html", background=config["arius_screen_search_background"])

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--debug', action='store_true', dest='debug', help='Enables debug mode'
                        ' - all messages received and sent by server are displayed')
    parser.add_argument('-v', '--verbose', action='store_true', dest='verbose', help='Enables verbose'
                        ' mode - displays all requests received by server')
    args = parser.parse_args()
    if args.debug:
        print 'Debug mode enabled'
    if not args.verbose:
        log = logging.getLogger('werkzeug')
        log.setLevel(logging.ERROR)
    else:
        print 'Verbose mode on'
    print 'Starting server'
    app.run(debug=args.debug, host=config['flask_server_address'], port=int(config['flask_server_port']))
