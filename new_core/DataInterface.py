from AbstractDataInterface import AbstractDataInterface

class DataInterface(AbstractDataInterface):
    def __init__(self):
        self.__data_finders = []

    def registerDataFinder(self, data_finder, priority):
        self.__data_finders.append([data_finder, priority])
        self.__data_finders.sort(key=lambda s: s[1])

    def getResults(self, query):
        result = []
        for finder in self.__data_finders:
            result += finder.getResult(finder.getQuery(query))
        return result