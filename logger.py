import logging
logging.getLogger("urllib3").setLevel(logging.CRITICAL)
logging.getLogger("elasticsearch").setLevel(logging.CRITICAL)
logging.getLogger("elasticsearch.trace").setLevel(logging.CRITICAL)


class Logger:
    def __init__(self, name):
        self.logger = logging.getLogger(name)
        self.logger.propagate = False
        ch = logging.StreamHandler()
        formatter = logging.Formatter(
            "[%(name)s][%(asctime)s][%(levelname)s] - %(message)s")
        ch.setFormatter(formatter)
        self.logger.addHandler(ch)

    def info(self, msg, *args, **kwargs):
        self.logger.info(msg, *args, **kwargs)

    def debug(self, msg, *args, **kwargs):
        self.logger.debug(msg, *args, **kwargs)

    def setLevel(self, level):
        if level == "info":
            logging.basicConfig(level=logging.INFO)
        elif level == "debug":
            logging.basicConfig(level=logging.DEBUG)
        elif level == "error":
            logging.basicConfig(level=logging.ERROR)
        else:
            logging.basicConfig(level=logging.CRITICAL)
