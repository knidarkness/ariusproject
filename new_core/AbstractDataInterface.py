class AbstractDataInterface:
    def getResults(self, query): raise NotImplementedError()
    def registerDataFinder(self, data_finder): raise NotImplementedError()