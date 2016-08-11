import json
import os


class ConstExtractor():
    def __init__(self, filename='configure.json'):
        filename = os.path.dirname(__file__) + filename
        with open(filename) as data_file:
            self.const_dict = json.load(data_file)

    def getValue(self, key):
        if key in self.const_dict:
            return self.const_dict[key].encode("utf-8")
        else:
            print("THERE IS NO SUCH CONSTANTA")
            raise ValueError
