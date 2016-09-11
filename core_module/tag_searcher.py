import sys
import logging
from tinydb import TinyDB, Query
sys.path.append("../")
from config import config
from logger import Logger


class TagSearcher:

    def __init__(self, database):
        self.__db = TinyDB(database)
        self.__tags = self.__db.table('tag_data')
        self.__synonyms = self.__db.table('synonyms')

    def find_tags(self, tags):
        result = []
        file_info = Query()
        searched_ids = self.find_all_synonyms(tags)
        print searched_ids
        result = self.__tags.search(file_info.tags.any(searched_ids))
        if result:
            result = sorted([[r['name'], r['prority']]
                             for r in result], key=lambda s: s[1])
        return result

    def find_all_synonyms(self, tags):
        result = [self.find_synonyms(tag)
                  for tag in tags if self.find_synonyms(tag)]
        return list(set(result))

    def find_synonyms(self, keyword):
        def is_in(tag_list, tag):
            return tag in tag_list
        tag_id = None
        tag = Query()
        tag_id = self.__synonyms.search(tag.equal.test(is_in, keyword))
        if tag_id:
            tag_id = tag_id[0]["key"]
        return tag_id

if __name__ == '__main__':
    a = TagSearcher(config['database_file'])
    print(a.find_synonyms('CEO'))
    print(a.find_all_synonyms(['r&d', 'kytsmey', 'r&d director']))
    print(a.find_tags(['r&d']))
