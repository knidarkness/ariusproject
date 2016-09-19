class AbstractHTTPClient:
    def __init__(self, host, port, url): raise NotImplementedError
    def sendPOST(self, data_dict, full_output=False, field=None): raise NotImplementedError()
    def sendGET(self, full_output=False, field=None): raise NotImplementedError()
