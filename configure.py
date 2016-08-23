import json
import os


class ConstExtractor():
    def __init__(self, filename='configure.json'):
        filename = os.path.dirname(__file__) + "/" + filename
        with open(filename, 'r') as data_file:
            self.const_dict = json.load(data_file)

    def getValue(self, key):
        if key in self.const_dict:
            if type(self.const_dict[key]) == list:
                return [el.encode("utf-8") for el in self.const_dict[key]]
            elif type(self.const_dict[key]) == dict:
                res_dic = {}
                for sub_key in self.const_dict[key]:
                    res_dic[sub_key.encode("utf-8")] = self.const_dict[key][sub_key].encode("utf-8")
                return res_dic
            else:
                return self.const_dict[key].encode("utf-8")
        else:
            print("THERE IS NO SUCH CONSTANTA")
            raise ValueError
