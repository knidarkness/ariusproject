from elasticsearch import Elasticsearch

import sys
sys.path.append("../")
from configure import ConstExtractor


class ESearchClient:
    """Simple class to search some data in the ElasticSearch database"""

    def __init__(self):    
        self._settings = ConstExtractor()
        self.es = Elasticsearch(self._settings.getValue("elastic_host"))


    def search(self, query):
        """Searches for all documents that are relevant to the query. 
        Returns a sorted by relevancy list of results, where every item is a tuple(path_to_file, score)"""
        response = self.es.search(index=self._settings.getValue("elastic_index"), doc_type=self._settings.getValue("elastic_type"),
                                  body={"query": {"match": {"file.content": query}}})
        result = []
        for doc in response['hits']['hits']:
            result.append((doc['_source']['title'], doc['_score']))
        return result

if __name__ == '__main__':
    query = 'machine learning'
    # Uncomment this line to check searching on webpages and presentations. It works perfectly.
    #query = "ARIUS"
    #query = "html"
    #query = 'Linux'
    AS = ESearchClient()
    print(AS.search(query))
