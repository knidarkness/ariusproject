# -*- coding: utf-8 -*-
import time
import random
import datetime
import quepy
from AbstractDataFinder import AbstractDataFinder
from Result import Result
from SPARQLWrapper import SPARQLWrapper, JSON


class QPyDataFinder(AbstractDataFinder):
    """
    This data finder gets the text info about the query
    string from the DBPedia.
    """

    def __init__(self, query_generator, output_processor):
        super(QPyDataFinder, self).__init__(query_generator, output_processor)
        self._sparql = SPARQLWrapper("http://dbpedia.org/sparql")
        self._dbpedia = quepy.install("dbpedia")

    def _get_define(self, results, target, metadata=None):
        for result in results["results"]["bindings"]:
            if result[target]["xml:lang"] == "en":
                return result[target]["value"]

    def _get_enum(self, results, target, metadata=None):
        used_labels = []

        for result in results["results"]["bindings"]:
            if result[target]["type"] == u"literal":
                if result[target]["xml:lang"] == "en":
                    label = result[target]["value"]
                    if label not in used_labels:
                        used_labels.append(label)
                        return label

    def _get_literal(self, results, target, metadata=None):
        for result in results["results"]["bindings"]:
            literal = result[target]["value"]
            if metadata:
                return metadata.format(literal)
            else:
                return literal

    def _get_time(self, results, target, metadata=None):
        gmt = time.mktime(time.gmtime())
        gmt = datetime.datetime.fromtimestamp(gmt)

        for result in results["results"]["bindings"]:
            offset = result[target]["value"].replace(u"−", u"-")

            if ("to" in offset) or ("and" in offset):
                if "to" in offset:
                    connector = "and"
                    from_offset, to_offset = offset.split("to")
                else:
                    connector = "or"
                    from_offset, to_offset = offset.split("and")

                from_offset, to_offset = int(from_offset), int(to_offset)

                if from_offset > to_offset:
                    from_offset, to_offset = to_offset, from_offset

                from_delta = datetime.timedelta(hours=from_offset)
                to_delta = datetime.timedelta(hours=to_offset)

                from_time = gmt + from_delta
                to_time = gmt + to_delta

                location_string = random.choice(["where you are",
                                                 "your location"])

                return "Between %s %s %s, depending on %s" % \
                    (from_time.strftime("%H:%M"),
                       connector,
                       to_time.strftime("%H:%M on %A"),
                       location_string)

            else:
                offset = int(offset)

                delta = datetime.timedelta(hours=offset)
                the_time = gmt + delta

                return the_time.strftime("%H:%M on %A")

    def _get_age(self, results, target, metadata=None):
        assert len(results["results"]["bindings"]) == 1

        birth_date = results["results"]["bindings"][0][target]["value"]
        year, month, days = birth_date.split("-")

        birth_date = datetime.date(int(year), int(month), int(days))

        now = datetime.datetime.utcnow()
        now = now.date()

        age = now - birth_date
        return "{} years old".format(age.days / 365)

    def _wikipedia2dbpedia(self, wikipedia_url):
        """
        Given a wikipedia URL returns the dbpedia resource
        of that page.
        """

        query = """
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        SELECT * WHERE {
            ?url foaf:isPrimaryTopicOf <%s>.
        }
        """ % wikipedia_url

        self._sparql.setQuery(query)
        self._sparql.setReturnFormat(JSON)
        results = self._sparql.query().convert()

        if not results["results"]["bindings"]:
            return None
        else:
            return results["results"]["bindings"][0]["url"]["value"]

    def getRawResult(self, question):
        target, query, metadata = self._dbpedia.get_query(question)

        if isinstance(metadata, tuple):
            query_type = metadata[0]
            metadata = metadata[1]
        else:
            query_type = metadata
            metadata = None

        if query is None:
            print 'no query'
            return None

        if target.startswith("?"):
            target = target[1:]
        if query:
            print query
            self._sparql.setQuery(query)
            self._sparql.setReturnFormat(JSON)
            results = self._sparql.query().convert()

            if not results["results"]["bindings"]:
                return None
            get_handlers = {
                "define": self._get_define,
                "enum": self._get_enum,
                "time": self._get_time,
                "literal": self._get_literal,
                "age": self._get_age,
            }
            print get_handlers[query_type](results)
            return [Result(get_handlers[query_type](results, target, metadata), 'speech')]
