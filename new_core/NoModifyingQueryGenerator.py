from AbstractQueryGenerator import AbstractQueryGenerator:

class NoModifyingQueryGenerator(AbstractQueryGenerator):
    """
    This is a QueryGenerator which is used for those DataFinders
    which processes user input without any modifications.
    """
    def getQuery(self, query):
        return query