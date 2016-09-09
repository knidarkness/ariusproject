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


extr = SenseExtractor('stop.txt')
print extr.get_keywords('Hello, could you tell me about SoftServe\'s projects in agriculture')
