from AbstractQueryGenerator import AbstractQueryGenerator
import RAKE

class KeywordsQueryGenerator:

    def __init__(self, stopList):
        try:
            self._extractor = RAKE.Rake(stopList)
        except IOError:
            print 'File not found'
            raise

    def get_query(self, input_string):
        data = self._extractor.run(input_string)
        result = []

        for entry in data:
            result.append(entry[0])

        return result