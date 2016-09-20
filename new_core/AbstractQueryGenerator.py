class AbstractQueryGenerator:
    """
    This is an interface for a QueryGenerator class.
    It must implement a get_query method which takes a string and
    returns its own type.
    """
    def get_query(self, input_string): raise NotImplementedError()