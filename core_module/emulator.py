import sys
sys.path.append("../")
from client import RESTClient
#input_connection = RESTClient('127.0.0.1', 5000, '/core/input')
output_connection = RESTClient('127.0.0.1', 5000, '/core/output')

while True:
    t = raw_input()
    data = raw_input()
    command = {
        "type": t,
        # "type": "SPEECH",
        "command": data
    }

    response = output_connection.send_data_in_POST(command, True, 0)
    print '======='
