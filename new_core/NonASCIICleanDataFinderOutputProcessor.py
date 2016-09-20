from AbstractDataFinderOutputProcessor import AbstractDataFinderOutputProcessor
from Result import Result


class NonASCIICleanDataFinderOutputProcessor(AbstractDataFinderOutputProcessor):
    """
    This is an OutputProcessor which is used for those DataFinders
    which return a data with no ASCII symbols in it.
    """

    def proceedOutput(self, output):
        if output:
            return [Result("".join([e for e in entry.body if ord(e) < 128]), entry.type) for entry in output]
        return output
