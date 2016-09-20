class AbstractDataFinder:
    """
    This is an ABC for DataFinder. All that is required
    from a DataFinder instance is to inherit from this ABC
    and impllement mehtoud getRawResult(self, query) - query is
    a string with user input, method should return a list of Result objects.

    Also, user can set a DataFinderOutputProcessor to modify results.
    To get results, use getResult(self, query)
    """
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