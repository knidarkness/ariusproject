import threading
from client import RESTClient
from logger import Logger
from Command import Command
from time import sleep
logger = Logger("CommandReceiver")


class CommandReceiver(threading.Thread):
    """
    This class connect to the server and get new commands to execute
    """

    def __init__(self, server_host, server_port, commands_url, lock):
        """
        This constructor method makes connection with the server, gets Rlock object
        and use it like its own lock and creates a flag "running" which allows to kill thread
        """
        self._server_connection = RESTClient(
            server_host, server_port, commands_url)
        self._is_running = True
        self._command_queue = []
        self._lock = lock

    def run(self):
        """
        This is the main method of an receiver.
        It checks if there`re any new commands on the server
        and in case if there are it returns these commands
        as self._current_commnad_type & self._current_command_body.
        """
        while self._is_running:
            self._receive_command()
            sleep(.05)

    def _receive_command(self):
        """
        It gets response from the server.
        If data is in command format then we add it to command queue
        """
        data = self._server_connection.GET_request(True, 0)
        if data['type'] != None:
            logger.debug('Received data {}'.format(data))
            self._lock.acquire()
            try:
                self._command_queue.append(Command(data['type'], data['command']))
                logger.info('Command received: {} : {}'.format(
                    data['type'], data['command']))
            finally:
                self._lock.release()    
        else:
            pass    

    def get_state(self):
        """
        It return the first command from the queue if it exist
        """
        if not self._command_queue:
            return None, None
        command = self._command_queue.pop(0)
        return command.type, command.type

    def is_state(self):
        """
        Return True if the command queue is not empty
        """
        if not self._command_queue:
            return False
        else:
            return True

