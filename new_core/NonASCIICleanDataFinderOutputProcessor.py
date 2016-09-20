from AbstractDataFinderOutputProcessor import AbstractDataFinderOutputProcessor
from Result import Result


class NonASCIICleanDataFinderOutputProcessor(AbstractDataFinderOutputProcessor):
    def proceedOutput(self, output):
        return [Result([e for e in entry.body if ord(e) < 128], entry.type) for entry in output]
