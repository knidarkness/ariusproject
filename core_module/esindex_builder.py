import os
import urllib
from elasticsearch import Elasticsearch
from bs4 import BeautifulSoup
import sys
import codecs
sys.path.append("../")
from config import config
from logger import Logger
logger = Logger("ES Builder")


class ESIndexBuilder:

    def __init__(self):
        self._host = config["elastic_host"]
        self._index = config["elastic_index"]
        self._type = config["elastic_type"]
        self._es = Elasticsearch(self._host)
        self._counter_success = 0
        self._counter_error = 0

    def index_file(self, path):
        """Adds a single file to index."""
        logger.info('Indexing %s', path)

        fname = os.path.basename(path)
        base, extension = os.path.splitext(fname)

        # clear filename from unallowed characters
        base = base.replace(" ", "_").replace("/", "_").replace(".", "_")

        if extension.lower() == '.url':
            # download webpage from the Internet
            url = open(path, "r").read()
            data = urllib.urlopen(url).read()
        else:
            # read local file
            if extension.lower() == '.html':
                data = codecs.open(path, "r", encoding='utf-8', errors='ignore').read()
                data = self._get_content(data)
            else:
                data = open(path, "rb").read()

        try:
            data = data.encode("base64")
        except Exception as e:
            logger.error('ERROR - Bad file encoding: {}' .format(e))
            self._counter_error += 1

            return
        rel_path = os.path.relpath(
            path, config['root_dir'] + config['elastic_docs_dir'])
        self._es.index(index=self._index, doc_type=self._type,
                       id=base + "_id_" + str(self._counter_success),
                       body={'file': data, 'title': rel_path})
        self._counter_success += 1

    def index_dir(self, dir):
        """Adds all files in directory to index. You can specify what formats
        will be added to index. To do this change elastic_index_file_types in config file."""
        logger.info('Indexing dir: %s', dir)

        for path, dirs, files in os.walk(dir):

            if any([True for _ in [".png", ".jpg", "getattachment", "pdf.js"] if _ in path]):
                continue

            for file in files:
                fname = os.path.join(path, file)
                base, extension = os.path.splitext(fname)
                if extension.lower() in config["elastic_index_file_types"]:
                    self.index_file(fname)

    def _get_content(self, content):
        """Extracts text from main section of webpage."""
        soup = BeautifulSoup(content, 'html.parser')
        for div in soup.find_all("article", {'class': 'blog_item'}):
            div.decompose()

        if len(soup.find_all("article", {'class': 'articles-grid'})) != 0:
            return ""
        for _id in ['main_page', 'main-wrapper']:
            if soup.find('section', id=_id) != None:
                return soup.find('section', id=_id).text
        return content

    def rebuild_index(self):
        """Completely removes the old index and creates new."""
        logger.info('Rebuiling index..')
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
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-v', '--verbose', action='store_true', dest='en_verbose',
                        help='Enables verbose mode - shows basic info.')
    args = parser.parse_args()

    if args.en_verbose:
        logger.setLevel("debug")
    else:
        logger.setLevel("critical")

    builder = ESIndexBuilder()
    builder.rebuild_index()
    builder.index_dir(config['root_dir'] + config['elastic_docs_dir'])
    logger.info('{} files were successfully added to index. {} Errors'.format(
        builder._counter_success, builder._counter_error))
