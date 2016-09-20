
class AbstractDataInterface:
    """
    This is an interface for DataInterface object. They are
    used to get access to all available data sources.

    To register new DataFinder object call registerDataFinder(self, finder, prioruty),
    where finder is an instance of DataFinder, and priority is how important results from
    the finder are. The less value of the priority, the most important the results are.

    To proceed a query use getResults method, with query as a String of user input.

    """

    def getResults(self, query): raise NotImplementedError()

    def registerDataFinder(self, data_finder): raise NotImplementedError()
