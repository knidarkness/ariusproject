from AbstractMatchFinder import AbstractMatchFinder
from difflib import SequenceMatcher as SM


class DifflibMatchFinder(AbstractMatchFinder):
    """
    String matching with Python stdlib - diiflib. More
    docs for AbstractMatchFinder.
    """
    @staticmethod
    def getMatch(string1, string2):
        return SM(None, string1, string2).ratio() * 100
