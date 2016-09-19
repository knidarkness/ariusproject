class AbstractDataFinder:
    def __init__(self, query_generator):
        self.__query_generator = query_generator

    def getResult(self, query): raise NotImplementedError()

    def getQuery(self, input_data):
        return self.__query_generator.get_query(input_data)

    def setQueryGenerator(self, query_generator):
        self.__query_generator = query_generator