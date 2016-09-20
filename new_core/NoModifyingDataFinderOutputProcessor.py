from AbstractDataFinderOutputProcessor import AbstractDataFinderOutputProcessor


class NoModifyingDataFinderOutputProcessor(AbstractDataFinderOutputProcessor):
    def proceedOutput(self, output):
        return output
