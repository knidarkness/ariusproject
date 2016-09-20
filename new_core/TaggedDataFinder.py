import os
from AbstractDataFinder import AbstractDataFinder
from tinydb import TinyDB, Query
from Result import Result


class TaggedDataFinder(AbstractDataFinder):
    """
    This DataFinder is used to work with TinyDB database
    and returns search results from pretagged data.

    It returns a list of Result instances with
    body equal to path, and type qualt to extension.
    """

    def __init__(self, query_generator, output_processor, database):
        super(TaggedDataFinder, self).__init__(query_generator, output_processor)
        self.__db = TinyDB(database)
        self.__tags = self.__db.table('tag_data')
        self.__synonyms = self.__db.table('synonyms')

    def getRawResult(self, keywords):
        result = []
        # replace synonyms by keys
        keywords = self.get_keys_by_synonyms(keywords)
        data = self.__tags.all()
        for d in data:
            entry_tags = self.get_tags(d)
            conf = self.get_confidence(entry_tags, keywords)
            if conf > 0:
                result.append(Entry(d['name'], d['path'], float(d['priority']), conf))
        if result:
            result = sorted(result, key=lambda s: (s.confidence, - s.priority), reverse=True)
            return [Result(r.path, os.path.splitext(r.path)[1]) for r in result]
            # return [(r.path, r.priority, r.confidence) for r in result]
        return None

    def get_tags(self, data_entry):
        res = [(t[0].lower(), t[1]) for t in data_entry['tags']]
        return res

    def get_confidence(self, entry_tags, keywords):
        res = 0
        for keyword in keywords:
            if keyword.lower() in [tag[0].lower() for tag in entry_tags]:
                res += float(tag[1])
        return res

    def get_keys_by_synonyms(self, tags):
        keys = []
        for tag in tags:
            keys += self.get_keys_by_synonym(tag)
        return list(set(keys))

    def get_keys_by_synonym(self, keyword):
        def is_in(tag_list, tag):
            return tag.lower() in [tag_entry.lower() for tag_entry in tag_list]
        tag_id = None
        tag = Query()
        tag_id = self.__synonyms.search(tag.equal.test(is_in, keyword))
        keys = []
        for i in range(len(tag_id)):
            keys.append(tag_id[i]["key"])
        return keys


class Entry:
    def __init__(self, name, path, priority, confidence):
        self.name = name
        self.path = path
        self.confidence = confidence
        self.priority = priority
