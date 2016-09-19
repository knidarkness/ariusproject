class Result:
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