from CoreController import CoreController
import sys
sys.path.append("../")
from logger import Logger
logger = Logger("Core[CoreMain]")


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--debug', action='store_true', dest='en_debug',
                        help='Enables debug mode and extra messages'
                        ' - detailed ouput of received commands, proceeding and sent messages.')
    parser.add_argument('-v', '--verbose', action='store_true', dest='en_verbose',
                        help='Enables verbose mode - shows basic info: states of statemachine,'
                        ' received messages and sent commands.')
    args = parser.parse_args()

    if args.en_verbose:
        logger.setLevel("info")
    elif args.en_debug:
        logger.setLevel("debug")
    else:
        logger.setLevel("critical")

    core_controller = CoreController()
    core_controller.run()
