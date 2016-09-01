"""
This is a server of the Arius project.

It can be run from command line with arguments '-d' or '--debug' to
enable debug mode, in which all messages received and sent by server will
be printed.

Also, if you want to see all connections made to server, you can run it
with '-v' or '--verbose' flags.
"""

from flask import Flask, jsonify, make_response, request, abort, render_template, json, url_for
import sys
sys.path.append("../")
from config import config
from logger import Logger 
import logging
logger = Logger("werkzeug")

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
        logger.debug("Here is Noise %s")
        return jsonify(request.json), 201


@app.route(config['flask_server_output_noise'], methods=['GET'])
def noise_output():
    global noise_available
    noise_available["status"] = "False"
    return jsonify(noise_available)


@app.route(config['flask_server_input_client'], methods=['POST'])
def speech_text_input():
    global input_text
    if not request.json or 'speech_text' not in request.json:
        abort(400)
    else:
        input_text = {"speech_text": request.json['speech_text']}
        logger.debug(input_text)
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
    logger.debug(request.json)
    if (not request.json) or ('type' not in request.json) or ('command' not in request.json):
        abort(400)
    else:
        command = {
            'type': request.json['type'],
            'command': request.json['command']
        }
        logger.debug(command)
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


@app.route(config['flask_server_black_address'])
def black():
    return render_template("black.html")


@app.route(config['flask_server_video_addr'])
def video(video_id):
    """
    We get string which indetifies which predefined video we show
    """
    with app.open_resource('static/video_data.json') as f:
        video_data = json.load(f)

    if video_id in video_data:
        return render_template("videoplayer.html", video_path="/static/videos/"+video_data[video_id]["video_name"], 
                                title=video_data[video_id]["title"],
                                support_text=video_data[video_id]["support_text"], 
                                style=url_for('static', filename='css/'+video_data[video_id]["style"]+'.css'))
    else:
        return render_template("error.html")

@app.route(config['flask_server_local_page'])
def page(page_path):
    """
    We get relative path to the page in static directory and return the page
    """
    return app.send_static_file('local_pages/'+page_path)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--debug', action='store_true', dest='debug', help='Enables debug mode'
                        ' - all messages received and sent by server are displayed')
    parser.add_argument('-v', '--verbose', action='store_true', dest='verbose', help='Enables verbose'
                        ' mode - displays all requests received by server')
    args = parser.parse_args()
    if args.verbose:
        logger.setLevel("info")
    elif args.debug:
        logger.setLevel("debug")
    else:
        logger.setLevel("critical")
    print 'Starting server'
    app.run(host=config['flask_server_address'], port=int(config['flask_server_port']))
