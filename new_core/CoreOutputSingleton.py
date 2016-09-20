from PlainHTTPClient import PlainHTTPClient
import sys
sys.path.append("../")
from config import config


class CoreOutputSingleton:
    """
    This is a singleton for output connection to server.
    Used to send data back to server. Used singleton as
    it is called from all the Behaviors.
    """
    instance = None

    @staticmethod
    def getInstance():
        if not CoreOutputSingleton.instance:
            CoreOutputSingleton.instance = PlainHTTPClient(config['core_server_output_address'],
                                                           config['core_server_output_port'],
                                                           config['core_server_output_url'])
        return CoreOutputSingleton.instance
