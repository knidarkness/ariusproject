import os
import urllib
from elasticsearch import Elasticsearch
from bs4 import BeautifulSoup
import sys
sys.path.append("../")
from config import config

TAG = "[Index Builder]"


class ESIndexBuilder:
    def __init__(self, debug=False):
        self._host = config["elastic_host"]
        self._index = config["elastic_index"]
        self._type = config["elastic_type"]
        self._es = Elasticsearch(self._host)
        self._debug = debug
        self._counter = 0

    def index_file(self, path):
        """Adds a single file to index."""
        if self._debug:
            print TAG, 'Indexing', path

        fname = os.path.basename(path)
        base, extension = os.path.splitext(fname)

        # clear filename from unallowed characters
        base = base.replace(" ", "_").replace("/", "_").replace(".", "_")

        if extension.lower() == '.url':
            # download webpage from the Internet
            url = open(path, "rb").read()
            data = urllib.urlopen(url).read()
        else:
            # read local file
            data = open(path, "rb").read()
            if extension.lower() == '.html':
                data = self._get_content(data)
        try:
            data = data.encode('utf-8')
            data = data.encode("base64")
        except Exception:
            print TAG, 'ERROR - Bad file encoding'
            return
        rel_path = os.path.relpath(path, config['root_dir'] + config['elastic_docs_dir'])
        self._es.index(index=self._index, doc_type=self._type, id=base + "_id_" + str(self._counter), body={'file': data, 'title': rel_path})
        self._counter += 1

    def index_dir(self, dir):
        """Adds all files in directory to index. You can specify what formats
        will be added to index. To do this change elastic_index_file_types in config file."""
        if self._debug:
            print TAG, 'Indexing dir:', dir

        for path, dirs, files in os.walk(dir):
            for file in files:
                fname = os.path.join(path, file)
                base, extension = os.path.splitext(fname)
                if extension.lower() in config["elastic_index_file_types"]:
                    self.index_file(fname)

    def _get_content(self, content):
        """Extracts text from main section of webpage."""
        soup = BeautifulSoup(content, 'html.parser')
        for _id in ['main_page', 'main-wrapper']:
            if soup.find('section', id=_id) != None:
                return soup.find('section', id=_id).text
        return content

    def rebuild_index(self):
        """Completely removes the old index and creates new."""
        if self._debug:
            print TAG, 'Rebuiling index..'
        self._es.indices.delete(index=self._index, ignore=[400, 404])
        self._es.indices.create(index=self._index, ignore=400)
        type_mapping = {
            self._type: {
                "properties": {
                    "file": {
                        "type": "attachment",
                        "fields": {
                            "content_type": {
                                "type": "string",
                                "term_vector": "with_positions_offsets",
                                "store": True
                            },
                            "title": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        }
        self._es.indices.put_mapping(index=self._index, doc_type=self._type, body=type_mapping)

if __name__ == '__main__':
    builder = ESIndexBuilder(debug=True)
    builder.rebuild_index()
    builder.index_dir(config['root_dir'] + config['elastic_docs_dir'])
    print builder._counter, 'files were added to index'
