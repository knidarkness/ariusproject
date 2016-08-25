import json
import os


class Config():
    def __init__(self, filename='configure.json'):
        filename = os.path.dirname(__file__) + "/" + filename
        with open(filename, 'rb') as data_file:
            self.const_dict = self.convert(json.load(data_file))

    def convert(self, input):
        if isinstance(input, dict):
            return {self.convert(key): self.convert(value)
                    for key, value in input.iteritems()}
        elif isinstance(input, list):
            return [self.convert(element) for element in input]
        elif isinstance(input, unicode):
            return input.encode('utf-8')
        else:
            return input

    def get(self, key):
        return self.const_dict[key]
