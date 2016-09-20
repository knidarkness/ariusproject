class AbstractDataFinder:
    def __init__(self, query_generator, output_processor):
        self.__query_generator = query_generator
        self.__output_processor = output_processor

    def getRawResult(self, query): raise NotImplementedError()

    def getResult(self, query):
        return self.__output_processor.proceedOutput(self.getRawResult(query))

    def getQuery(self, input_data):
        return self.__query_generator.get_query(input_data)

    def setQueryGenerator(self, query_generator):
        self.__query_generator = query_generator