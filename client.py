import httplib
import json


class RESTClient:
    """
    This is a simple client for communicating with server via REST API.
    Methods send_data_in_POST and GET_request are main communication tools
    of this class.

    While creating an instance of this class you should pass it three arguments:
    host - hostname or ip-address of target server (should be given as a string)
    (e.g. 'localhost' or '172.16.0.123')
    port - number of a port to connect (integer) (e.g. 80)
    url - URL of the server resource which you are connecting to (e.g. '/index')

    Obviously, send_data_in_POST method converts to JSON format and
    sends given as an argument dictionary to the host:port/url given
    while initializing instance of this class. This method returns a tuple
    of 3 elements: response, response status and response headers. Headers are
    represented as a list.

    GET_request() uses host:port/url from init method and sends a GET request
    to given address and returns a server`s response as a tuple of 3 elements:
    response, response status and response headers. Headers are  represented
    as a list.

    In case when you don`t need all 3 elements of methods output you can pass it
    2 argument simple_output=True and then in 3rd specify which part of data you
    want to get: 0 - response body, 1 - response status, 2 - response headers.
    (e.g. send_data_in_POST(some_data, True, 0) - will return you only response`s
    body. The same can be applied to GET_request method (e.g. GET_request(True, 1)
    will return only a status part of the response).

    Example usage with Arius server:

    c1 = RESTClient('localhost', 5000, '/input')
    data = {'speech_text':'stupid_text'}
    data = c1.send_data_in_POST(data, True, 0)
    print data

    >> {u'speech_text': u'stupid_text'}

    c2 = RESTClient('localhost', 5000, '/core/input')
    data = c2.GET_request()
    print data

    >> ({u"speech_text": u"stupid_text"}, 200,
    [('date', 'Thu, 04 Aug 2016 21:24:21 GMT'), ('content-length', '35'),
    ('content-type', 'application/json'), ('server', 'Werkzeug/0.10.4 Python/2.7.12')])
    """

    def __init__(self, host, port, url):
        self._connection = httplib.HTTPConnection(host, port)
        self._headers = {'Content-type': 'application/json'}
        self._url = url

    def send_data_in_POST(self, data_dict, simple_output=False, simple_specify=None):
        """
        Used to send POST requested and return server`s response.
        Usage help in class documentation.
        """
        json_data = json.dumps(data_dict)
        self._connection.request('POST', self._url, json_data, self._headers)

        response = self._connection.getresponse()

        response_data = json.loads(response.read())
        response_status = response.status
        response_headers = response.getheaders()

        result = (response_data, response_status, response_headers)
        if simple_output and type(simple_specify) == int and simple_specify < len(result):
            return result[simple_specify]
        return result

    def GET_request(self, simple_output=False, simple_specify=None):
        """
        Used to send GET requested and return server`s response.
        Usage help in class documentation.
        """
        self._connection.request('GET', self._url)
        response = self._connection.getresponse()

        response_data = json.loads(response.read())
        response_status = response.status
        response_headers = response.getheaders()

        result = (response_data, response_status, response_headers)
        if simple_output and type(simple_specify) == int and simple_specify < len(result):
            return result[simple_specify]
        return result
