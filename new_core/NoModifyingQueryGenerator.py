from AbstractQueryGenerator import AbstractQueryGenerator


class NoModifyingQueryGenerator(AbstractQueryGenerator):
    """
    This is a QueryGenerator which is used for those DataFinders
    which processes user input without any modifications.
    """

    def get_query(self, query):
        print 'query', query
        return query
