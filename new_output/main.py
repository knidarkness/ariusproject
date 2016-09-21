from BrowserController import BrowserController
from OutputController import OutputController

import sys
sys.path.append("../")
from logger import Logger
logger = Logger("Output[OutputMain]")

if __name__ == "__main__":
    import argparse
    import re
    import sys
    parser = argparse.ArgumentParser()
    parser.add_argument('-v', '--verbose', action='store_true',
                        dest='en_verbose', help='Enables terminal output of current commands')
    parser.add_argument('-d', '--debug', action='store_true', dest='en_debug',
                        help='Enables terminal output of all internall processes')

    parser.add_argument('-s', '--size', type=str, dest='size',
                        help='Use this parameter to set size of the output module`s window or set a fullscreen mode.'
                        'It should be given in the following format: widthxheight (e.g. 400x1000) or in case you want enter fullscreen - "fullscreen"')

    args = parser.parse_args()

    if args.en_verbose:
        logger.setLevel("info")
    elif args.en_debug:
        logger.setLevel("debug")
    else:
        logger.setLevel("critical")

    out_controller = OutputController()
    if args.size == 'fullscreen':
        ui = BrowserController(out_controller, True, [])
    elif not args.size:
        ui = BrowserController(out_controller, False, [])
    elif re.match(r'([0-9]+x[0-9]+)', args.size):
        size = args.size.split('x')
        try:
            for s in xrange(len(size)):
                size[s] = int(size[s])
        except Exception as e:
            print 'Something went wrong'
            print e
            print 'Stopped'
            sys.exit()
        print type(size[0])
        ui = BrowserController(out_controller, False, [size[0], size[1]])
    else:
        print 'Wrong argument in -s or --size.'
        'It is {}, while it should be given in the following format:'
        'widthxheight(e.g. 400x1000) or in case you want enter fullscreen - "fullscreen"'.format(args.size)
        sys.exit()
    if ui:
        out_controller.start()
        ui.run()
    else:
        print 'Something went wrong. Stopped'
