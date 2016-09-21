import sys
import logging
from tinydb import TinyDB, Query
sys.path.append("../")
from config import config


class Modifyier:
    def __init__(self, database):
        self.__db = TinyDB(database)
        self.__tags = self.__db.table('tag_data')
        self.__synonyms = self.__db.table('synonyms')

    def delete(self, table, name):
        q = Query()
        if table == 'synonyms':
            self.__synonyms.remove(q.name == name)
        elif table == 'tag_data':
            self.__tags.remove(q.name == name)

    def get(self, table, only_names=True):
        q = Query()
        result = []
        if table == 'synonyms':
            result = self.__synonyms.all()
        elif table == 'tag_data':
            result = self.__tags.all()
        if only_names:
            return [[a['name'] for a in i] for i in result]
        return result

    def insert(self, table, value_dict):
        q = Query()
        if table == 'synonyms':
            self.__synonyms.insert(value_dict)
        elif table == 'tag_data':
            result = self.__tags.insert(value_dict)

    def modify(self, table, name, new_dict):
        q = Query()
        if table == 'synonyms':
            self.__synonyms.update(new_dict, q.name == name)
        elif table == 'tag_data':
            self.__tags.update(new_dict, q.name == name)

if __name__ == '__main__':
    mod = Modifyier(config['database_file'])
    while True:
        operation = raw_input('Enter operation you want to do[insert, get]')
        table = raw_input('what table you want to modify[synonyms, tag_data]')
        if operation == 'insert':
            value_dict = None
            if table == 'tag_data':
                name = str(raw_input('Enter entry name'))
                path = str(raw_input('Enter relative path'))
                priority = str(raw_input('Enter priority of the file'))
                tags = str(raw_input('Enter tags in following format: "tag name 1, priority1'))
                t = tags.split(',')
                tag_list = []
                print(tags)
                for i in range(1, len(t), 2):
                    j = i - 1
                    tag_list.append([t[j], t[i]])
                print(tag_list)
                value_dict = {'name': name, 'path':path, 'priority':priority, 'tags': tag_list}
            elif table == 'synonyms':
                name = raw_input('Enter key-word')
                syns = raw_input('Enter synonyms with comas as separators')
                s = syns.split(',')
                value_dict = {'key': name, 'equal': s}
            if value_dict:
                mod.insert(table, value_dict)
        elif operation == 'get':
            query = raw_input('Do you want to get full output[Yes/leave empty]')
            res = mod.get(table, not query)
            for i in res:
                print(i)
