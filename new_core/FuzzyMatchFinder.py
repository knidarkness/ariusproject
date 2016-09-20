from fuzzywuzzy import fuzz
from AbstractMatchFinder import AbstractMatchFinder


class FuzzyMatchFinder(AbstractMatchFinder):
    """
    This is a string matching comparer for Fuzzy-Wuzzy lib.
    Required fuzzy-wuzzy package. Returns a double value
    how much strings are the same.
    """
    @staticmethod
    def getMatch(string1, string2):
        return fuzz.ratio(string1, string2)
