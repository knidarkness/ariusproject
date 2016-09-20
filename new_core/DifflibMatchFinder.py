from AbstractMatchFinder import AbstractMatchFinder
from difflib import SequenceMatcher as SM


class DifflibMatchFinder(AbstractMatchFinder):
    @staticmethod
    def findMatch(string1, string2):
        return SM(None, string1, string2).ratio() * 100
