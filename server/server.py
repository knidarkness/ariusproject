from flask import Flask, jsonify, make_response, request, abort, render_template
import sys
sys.path.append("/home/arius/ariusproject/")
from configure import ConstExtractor

settings = ConstExtractor()


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


@app.route(settings.getValue('flask_server_input_noise'), methods=['POST'])
def noise_input():
    global noise_available
    noise_available["status"] = "True"
    if not request.json or "speech_text" not in request.json:
        abort(400)
    else:
        print "Here is Noise"
        return jsonify(request.json), 201


@app.route(settings.getValue('flask_server_output_noise'), methods=['GET'])
def noise_output():
    global noise_available
    tmp_noise = noise_available
    noise_available["status"] = "False"
    return jsonify(noise_available)


@app.route(settings.getValue('flask_server_input_client'), methods=['POST'])
def speech_text_input():
    global input_text
    if not request.json or 'speech_text' not in request.json:
        abort(400)
    else:
        input_text = {"speech_text": request.json['speech_text']}
        print input_text
        return jsonify(input_text), 201


@app.route(settings.getValue('flask_server_core_input_connection'), methods=['GET'])
def get_speech_text():
    global input_text
    tmp_text = input_text
    input_text = {"speech_text": "no updates"}
    return jsonify(tmp_text)


@app.route(settings.getValue('flask_server_core_output_connection'), methods=['POST'])
def command_input():
    global command
    print request.json
    if not request.json or not 'type' in request.json or 'command' not in request.json:
        abort(400)
    else:
        command = {
            'type': request.json['type'],
            'command': request.json['command']
        }
        print command
        command_queue.append(command)
        return jsonify(command), 201


@app.route(settings.getValue('flask_server_output_client'), methods=['GET'])
def get_command():
    global command_queue
    if command_queue:
        command=command_queue.pop(0)
    else:
        command = {
            "type": "none",
            "command": "none"
        }
    return jsonify(tmp_command)


@app.route(settings.getValue('flask_server_idle_address'))
def idle():
    return render_template("idle.html", background=settings.getValue("arius_screen_idle_background"))


@app.route(settings.getValue('flask_server_error_address'))
def error():
    return render_template("error.html", background=settings.getValue("arius_screen_error_background"))


@app.route(settings.getValue('flask_server_search_address'))
def search():
    return render_template("search.html", background=settings.getValue("arius_screen_search_background"))

if __name__ == '__main__':
    app.run(debug=True, host=settings.getValue('flask_server_address'), port=int(settings.getValue('flask_server_port')))
