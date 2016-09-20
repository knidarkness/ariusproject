from fuzzywuzzy import fuzz
from AbstractMatchFinder import AbstractMatchFinder


class FuzzyMatchFinder(AbstractMatchFinder):
    @staticmethod
    def getMatch(string1, string2):
        return fuzz.ratio(string1, string2)
