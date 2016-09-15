import logging
from config import config
logging.getLogger("quepy").setLevel(logging.CRITICAL)
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
        prefix = config['root_dir'] + "logs/"
        debug_file = logging.FileHandler(prefix + name + '.' + 'logging.debug.txt', encoding='utf-8')
        debug_file.setLevel(logging.DEBUG)
        debug_file.setFormatter(formatter)
        self.logger.addHandler(debug_file)

        """
        exception_file = logging.FileHandler(prefix + name +'.' +'logging.error.txt', encoding='utf-8')
        exception_file.setLevel(logging.ERROR)
        exception_file.setFormatter(formatter)
        self.logger.addHandler(exception_file)

        info_file = logging.FileHandler(prefix + name + '.' +'logging.info.txt', encoding='utf-8')
        info_file.setLevel(logging.INFO)
        info_file.setFormatter(formatter)
        self.logger.addHandler(info_file)
        """

    def info(self, msg, *args, **kwargs):
        self.logger.info(msg, *args, **kwargs)

    def debug(self, msg, *args, **kwargs):
        self.logger.debug(msg, *args, **kwargs)

    def error(self, msg, *args, **kwargs):
        self.logger.error(msg, *args, **kwargs)

    def setLevel(self, level):
        if level == "info":
            logging.basicConfig(level=logging.INFO)
        elif level == "debug":
            logging.basicConfig(level=logging.DEBUG)
        elif level == "error":
            logging.basicConfig(level=logging.ERROR)
        else:
            logging.basicConfig(level=logging.CRITICAL)
