from AbstractQueryGenerator import AbstractQueryGenerator:

class NoModifyingQueryGenerator(AbstractQueryGenerator):
    def getQuery(self, query):
        return query