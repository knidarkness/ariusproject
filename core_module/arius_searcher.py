from elasticsearch import Elasticsearch

import sys
sys.path.append("../")
from config import config


class ESearchClient:
    """Simple class to search some data in the ElasticSearch database"""

    def __init__(self):

        self._host = config["elastic_host"]
        self._index = config["elastic_index"]
        self._type = config["elastic_type"]
        self._es = Elasticsearch(self._host)

    def search(self, query):
        """Searches for all documents that are relevant to the query.
        Returns a sorted by relevancy list of results, where every item is a tuple(path_to_file, score)"""
        queryBody = {
            "query": {
                "bool": {
                    "should": [
                        {
                            "match": {
                                "file.content": queryItem
                            }
                        } for queryItem in query.split()
                    ],
                    "minimum_number_should_match": "2<75%"
                }
            }
        }

        response = self._es.search(index=self._index, doc_type=self._type, body=queryBody)
        result = []
        for doc in response['hits']['hits']:
            result.append((doc['_source']['title'], doc['_score']))
        return result

if __name__ == '__main__':
    query = 'softserve arius'
    # query = "ARIUS"
    # query = "html"
    # query = 'Linux'
    AS = ESearchClient()
    print(AS.search(query))
