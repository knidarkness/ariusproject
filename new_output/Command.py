class Command:
    """
    This class represents command we use for output
    """

    def __init__(self, c_type, c_body):
        self.c_type = c_type
        self.c_body = c_body

    @property
    def type(self):
        return self.c_type

    @property
    def body(self):
        return self.c_body



       
