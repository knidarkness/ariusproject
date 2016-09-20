class AbstractDataFinderOutputProcessor(object):
    """
    This is an ABC for DataFinderOutputProcessor, which is
    used to proceed DataFinder`s output.

    To implement this interface class must has proceedOutput methood
    which takes and  returns a list of Result objects.
    """

    def proceedOutput(self, output): raise NotImplementedError()
