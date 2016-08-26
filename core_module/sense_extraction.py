import RAKE


class SenseExtractor:
    """
    This class should be used for key-phrases extraction from the  user`s query. It
    looks like it is the most convinient algorithm for this purpose.
    """

    def __init__(self, stopList):
        try:
            self._extractor = RAKE.Rake(stopList)
        except IOError:
            print 'File not found'
            raise

    def get_keywords(self, query):
        data = self._extractor.run(query)
        result = []

        for entry in data:
            result.append(entry[0])

        return result


# extr = SenseExtractor('/home/sdubovyk/Projects/flask_test/hello_worl/stop.txt')
# print extr.get_context('Hello, could you tell me about SoftServe`s projects in agriculture')
