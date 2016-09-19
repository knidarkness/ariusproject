from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DiffMatchFinder import DiffMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from CommandConfigLoader import CommandConfigLoader
from IdleCommandProceedingBehaviorSingleton import IdleCommandProceedingBehaviorSingleton
from DisplayingDataCommandProceedingBehaviorSingleton import DisplayingDataCommandProceedingBehaviorSingleton
from SearchFailedCommandProceedingBehaviorSingleton import SearchFailedCommandProceedingBehaviorSingleton
from AbstractCoreCommandProceedingBehavior import AbstractCoreCommandProceedingBehavior
from DataInterface import DataInterface
from ESearchDataFinder import ESearchDataFinder
from QPyDataFinder import QPyDataFinder
from TaggedDataFinder import TaggedDataFinder
from KeywordsQueryGenerator import KeywordsQueryGenerator
from NoModifyingQueryGenerator import NoModifyingQueryGenerator
from singleton import singleton

import random
import sys
import os
import threading
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core")


@singleton
class SearchCommandProceedingBehavior(AbstractCoreCommandProceedingBehavior):

    def __init__(self, recog):
        super(SearchCommandProceedingBehavior, self).__init__(recog)
        self.__behavior_type = "search"
        self.__commands_dict = config['core_commands_search']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader(self.__commands_dict), DiffMatchFinder()))
        self._output_connection = CoreOutputSingleton.getInstance()
        self._data_interface = DataInterface()
        self._data_interface.registerDataFinder(QPyDataFinder(NoModifyingQueryGenerator()), 1)
        self._data_interface.registerDataFinder(TaggedDataFinder(KeywordsQueryGenerator(), config['database_file']), 2)
        self._data_interface.registerDataFinder(ESearchDataFinder(KeywordsQueryGenerator()), 3)
        self._history = []
        self._parent = None

    def proceed(self, user_input, parent):
        self._parent = parent
        recognized_command = self._command_recognizer.recognize_command(user_input)
        if recognized_command == "CANCEL":
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'IDLE'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['CANCEL'])})

            self._parent.setProceedingBehavior(IdleCommandProceedingBehaviorSingleton.getInstance())
            return None
        elif recognized_command == "MUTE":
            self._output_connection.sendPOST({'type': 'MUTE', 'command': ''})
        elif recognized_command == "UNMUTE":
            self._output_connection.sendPOST({'type': 'UNMUTE', 'command': ''})
        else:
            self._parent.user_input = None
            self._command_recognizer.remove_command(user_input, 'START')
            self._async_work(self._find_data, user_input)

    def _find_data(self, user_input):
        logger.info('Searching data...')
        data = self._data_interface.getResults(user_input)

        if data is not None and len(data) != 0:
            _id = 0
            result = data[_id]
            if result.type == "speech":
                _id += 1
                result = data[_id]
            while result.body in self._history:
                _id += 1
                if _id >= len(data):
                    result.append({'type': 'OPEN_SCREEN', 'command': 'ERROR'})
                    return None
                result = data[_id]
            self._history.append(result.body)

            if result.type == '.pdf':
                rel_path = os.path.relpath(config['root_dir'] + config['elastic_docs_dir'] + result.body,
                                           config['root_dir'] + config['output_server_home'])
                fname = "pdf.js/web/viewer.html?file=" + rel_path
                data = {'type': 'OPEN_PDF', 'command': fname}
            elif result.type == '.html':
                data = {'type': 'OPEN_LOCAL_PAGE', 'command': result.body}
            elif result.type == '.url':
                link = open(result.body).read()
                data = {'type': 'OPEN_URL', 'command': link}
            elif result.type == '.webm':
                data = {'type': 'OPEN_VIDEO', 'command': result.body}
            self._parent.setProceedingBehavior(DisplayingDataCommandProceedingBehaviorSingleton.getInstance())
        else:
            data = {'type': 'OPEN_SCREEN', 'command': 'ERROR'}
            self._parent.setProceedingBehavior(SearchFailedCommandProceedingBehaviorSingleton.getInstance())

        result.append(data)
        return None

    def _async_work(self, function, argument):

        result = []
        logger.info(argument)
        worker = threading.Thread(target=function, args=(argument, result))
        worker.start()
        while not (self._parent.user_input is not None or result):
            pass
        if result:
            self._output_connection.sendPOST(result[0])
            result = None
            return None
        else:
            logger.info('Cancelled')
            return None
