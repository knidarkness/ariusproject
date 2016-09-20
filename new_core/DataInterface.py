from AbstractDataInterface import AbstractDataInterface


class DataInterface(AbstractDataInterface):
    """
    This class is used to provide centralized interface to data.
    More info for AbstractDataInterface.
    """

    def __init__(self):
        self.__data_finders = []

    def registerDataFinder(self, data_finder, priority):
        self.__data_finders.append([data_finder, priority])
        self.__data_finders.sort(key=lambda s: s[1])

    def getResults(self, query):

        result = []
        for finder in self.__data_finders:
            r = finder[0].getResult(finder[0].getQuery(query))
            print(r)
            if r and type(r) == list:
                result += r
            elif r:
                if r.body:
                    result += [r]
        print('+++++++++++++++++++++++++')
        print result
        return result
