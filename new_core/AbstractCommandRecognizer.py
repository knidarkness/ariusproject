class AbstractCommandRecognizer:
    """
    This is an interface for command recognizing classes.
    It must provide at least a method recognize command, which
    takes a String argument (input text to be recognized) and
    returns a String - recognized command.
    """

    def recognizeCommand(self, command): raise NotImplementedError()
