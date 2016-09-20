from AbstractDataFinderOutputProcessor import AbstractDataFinderOutputProcessor


class NoModifyingDataFinderOutputProcessor(AbstractDataFinderOutputProcessor):
    """
    This is an OutputProcessor which is used for those DataFinders
    which process output without any modifications.
    """
    def proceedOutput(self, output):
        return output
