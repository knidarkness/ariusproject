from CoreController import CoreController
import sys
sys.path.append("../")
from logger import Logger
logger = Logger("Core[CoreMain]")

"""
This is a main file of core module.
It should be run with flags '-v' or '--verbose' for basic
info about the modules interaction.
If you run it with '-d' or '--debug' flags,
all internal processes will be opened for you.

To run core module w/out any output, just
run without any flags.
"""

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
