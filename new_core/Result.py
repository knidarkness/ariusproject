class Result:
    """
    A flexible class for storing data about search results
    from DataFinders.
    """
    def __init__(self, body, type=None):
        self.__body = body
        self.__type = type

    @property
    def body(self):
        return self.__body

    @property
    def type(self):
        return self.__type

    def set_body(self, new_body):
        self.__body = new_body

    def set_type(self, new_type):
        self.__type = new_type

    def add_attribute(self, name, val):
        setattr(self, name, val)

    def __str__(self):
        return "Result ({}, {})".format(self.__body, self.__type)        
    def __repr__(self):
        return "({}, {})".format(self.__body, self.__type)