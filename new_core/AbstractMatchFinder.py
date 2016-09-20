class AbstractMatchFinder:
    """
    This is used to define interface of MatchFinder objects, used for
    string matching in the CommandRecognizer.

    getMatch must return a double value of mathcing between string1
    and string2.
    """
    @staticmethod
    def getMatch(string1, string2): raise NotImplementedError()
