import sys
import logging
from tinydb import TinyDB, Query
sys.path.append("../")
from config import config
from logger import Logger

class Entry:
    def __init__(self, name, path, priority, confidence):
        self.name = name
        self.path = path
        self.confidence = confidence
        self.priority = priority

class TagSearcher:

    def __init__(self, database):
        self.__db = TinyDB(database)
        self.__tags = self.__db.table('tag_data')
        self.__synonyms = self.__db.table('synonyms')

    def find_tags(self, tags):
        result = []
        file_info = Query()
        searched_ids = self.find_all_synonyms(tags)
        data = self.__tags.all()
        for d in data:
            t = self.get_tags(d)
            conf = self.get_confidence(tags, d)
            if conf > 0:
                result.append(Entry(d['name'], d['path'], float(d['priority']), conf))
        if result:
            result = sorted(result, key=lambda s: (s.confidence, - s.priority), reverse=True)
            return [r.path for r in result]
            # return [(r.path, r.priority, r.confidence) for r in result]
        return None

    def get_tags(self, data_entry):
        res = [t[0].lower() for t in data_entry['tags']]
        return res

    def get_confidence(self, tags, tag_entry):
        res = 0
        for t in tag_entry['tags']:
            if t[0].lower() in [tag.lower() for tag in tags]:
                res += float(t[1])
        return res

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
    print(a.find_tags(['aws']))
