from DictBasedCommandRecognizer import DictBasedCommandRecognizer
from DifflibMatchFinder import DifflibMatchFinder
from CoreOutputSingleton import CoreOutputSingleton
from CommandConfigLoader import CommandConfigLoader
from DataInterface import DataInterface
from ESearchDataFinder import ESearchDataFinder
from QPyDataFinder import QPyDataFinder
from TaggedDataFinder import TaggedDataFinder
from AbstractCoreCommandProceedingBehavior import AbstractCoreCommandProceedingBehavior
from KeywordsQueryGenerator import KeywordsQueryGenerator
from NoModifyingQueryGenerator import NoModifyingQueryGenerator
from NonASCIICleanDataFinderOutputProcessor import NonASCIICleanDataFinderOutputProcessor
from NoModifyingDataFinderOutputProcessor import NoModifyingDataFinderOutputProcessor
import random
import sys
import os
import threading
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("Core[Searching]")


class SearchCommandProceedingBehavior(AbstractCoreCommandProceedingBehavior):
    instance = None

    @staticmethod
    def getInstance():
        if not SearchCommandProceedingBehavior.instance:
            SearchCommandProceedingBehavior.instance = SearchCommandProceedingBehavior()
        return SearchCommandProceedingBehavior.instance

    def __init__(self):
        super(SearchCommandProceedingBehavior, self).__init__()
        self.behavior_type = "search"
        self.__commands_dict = config['core_commands_search']
        self.setCommandRecognizer(DictBasedCommandRecognizer(CommandConfigLoader.load(self.__commands_dict), DifflibMatchFinder))
        self._output_connection = CoreOutputSingleton.getInstance()
        self._data_interface = DataInterface()
        self._data_interface.registerDataFinder(QPyDataFinder(NoModifyingQueryGenerator(), NonASCIICleanDataFinderOutputProcessor()), 1)
        self._data_interface.registerDataFinder(TaggedDataFinder(KeywordsQueryGenerator(), NoModifyingDataFinderOutputProcessor(), config['database_file']), 2)
        self._data_interface.registerDataFinder(ESearchDataFinder(KeywordsQueryGenerator(), NoModifyingDataFinderOutputProcessor()), 3)
        self._history = []
        self._parent = None

    def proceed(self, user_input, parent):
        self._parent = parent
        self._parent.user_input = None

        recognized_command = self._command_recognizer.recognize_command(user_input)
        if recognized_command == "CANCEL":
            self._history = []
            self._output_connection.sendPOST({'type': 'OPEN_SCREEN', 'command': 'IDLE'})
            self._output_connection.sendPOST({'type': 'SPEAK',
                                              'command': random.choice(config['voice_command_output']['CANCEL'])})
            from IdleCommandProceedingBehavior import IdleCommandProceedingBehavior
            parent.setProceedingBehavior(IdleCommandProceedingBehavior.getInstance())
            return None
        elif recognized_command == "MUTE":
            self._output_connection.sendPOST({'type': 'MUTE', 'command': ''})
        elif recognized_command == "UNMUTE":
            self._output_connection.sendPOST({'type': 'UNMUTE', 'command': ''})
        else:
            user_input = self._command_recognizer.remove_command(user_input, 'START')
            self._async_work(self._find_data, user_input)

    def _find_data(self, user_input, ret_result):
        from DisplayingDataCommandProceedingBehavior import DisplayingDataCommandProceedingBehavior
        from SearchFailedCommandProceedingBehavior import SearchFailedCommandProceedingBehavior

        logger.info('Searching data...')
        results = self._data_interface.getResults(user_input)
        request = ""
        if results is not None and len(results) != 0:
            _id = 0
            result = results[_id]
            while result in self._history:
                _id += 1
                if _id >= len(results):
                    ret_result.append({'type': 'OPEN_SCREEN', 'command': 'ERROR'})
                    return None
                result = results[_id]
            self._history.append(result)
            if result.type == '.pdf':
                rel_path = os.path.relpath(config['root_dir'] + config['elastic_docs_dir'] + result.body,
                                           config['root_dir'] + config['output_server_home'])
                fname = "pdf.js/web/viewer.html?file=" + rel_path
                request = {'type': 'OPEN_PDF', 'command': fname}
            elif result.type == '.html':
                request = {'type': 'OPEN_LOCAL_PAGE', 'command': result.body}
            elif result.type == '.url':
                link = open(result.body).read()
                request = {'type': 'OPEN_URL', 'command': link}
            elif result.type == '.webm':
                request = {'type': 'OPEN_VIDEO', 'command': result.body}
            elif result.type == "speech":
                request = {'type': 'SPEAK', 'command': result.body}
            self._parent.setProceedingBehavior(DisplayingDataCommandProceedingBehavior.getInstance())
        else:
            request = {'type': 'OPEN_SCREEN', 'command': 'ERROR'}
            self._parent.setProceedingBehavior(SearchFailedCommandProceedingBehavior.getInstance())

        ret_result.append(request)
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
