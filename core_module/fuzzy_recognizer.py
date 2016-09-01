from fuzzywuzzy import fuzz
import sys
sys.path.append("../")
from logger import Logger 
logger = Logger("Fuzzy_recognizer")
class FuzzyRecognizer:
    """
    This class is used to provide fuzzy input and uses
    FuzzyWuzzy library.

    To use it you should have installed two following packages:
    python-Levenshtein
    fuzzywuzzy

    Here are some examples of using this class:

    rec = FuzzyRecognizer({'A': ['hello', 'how are you'], 'B': ['get away', 'bye']})
    print rec.recognize_command('hallo')
    >>> 'A'
    print rec.recognize_command('hallo', 'B')
    >>> False
    print rec.clean_input('hallo how was your day', 'A')
    >>> 'how was your day'

    When creating an instane of FuzzyRecognizer you the only required argument is
    a dictionaty of commands given in following format:
    {command_name1, [list of possible key-phrases 1], ..., command_nameN, [list of possible key-phrases N]}

    Also, you can set minimal confidence level (from 0 to 1) which defines, how far
    input can vary. By default it is set to .9, but if you want to have more freedom
    and user`s grammar is poor or commands are relatively short feel free to set it
    to values about .6 or .7.

    rec = FuzzyRecognizer(some_dictionary, .7)

    Finally, FuzzyRecognizer has great ability for debugging - just
    send it an argument debug = True and you`ll be able to control
    its flow and catch even most cunning bugs.

    rec = FuzzyRecognizer(some_dictionary, debug=True)

    """

    def __init__(self, commands, min_confidence=.9):
        if type(commands) != dict:
            print 'Type of command dictionary must be a dictionary and not a {}. Surprise!'.format(type(commands))
            raise ValueError(
                'Type of command dictionary must be a dictionary and not a {}. Surprise!'.format(type(commands)))
        if min_confidence > 1 or min_confidence < 0:
            print 'Too low or too high value of minimal confidence. It should be between 0 and 1'
            raise ValueError('Too low or too high value of minimal confidence')
        self._min_confidence = min_confidence * 100
        self._commands = commands

    def recognize_command(self, input, target_command=None):
        """
        This function is used to recognize commands in given text.
        It has two modes:
        1) Reconize command and return its type.
        2) Check if given command is in the input.

        First of all, assume that we have initialized FuzzyRecognizer
        object and named it rec. Now, let`s see how both types work:

        1) To detect any command you can just call this method with
        text you want to analyze, like here:

        print rec.recognize_command('some text inputed here')
        >>> 'COMMAND_A'
        And if FuzzyRecognizer will detect one or some commands
        it will return the command, with the highest probability
        level. In case, if command will not be recognized or
        recognizer`s confidence will be too low it will
        return None value.

        2) To check if the given text contains some specific
        command. To do it call method like in following example:

        >>> print rec.recognize_command(some_text, 'COMMAND_A')

        If probability level of given command is high enough True
        will be returned, if not - False.
        """
        logger.debug('COMMAND RECOGNIZING BEGAN')

        if target_command:
            if target_command not in self._commands.keys():
                logger.debug('Given wrong command: there`s no such command in the dictionary. Exiting')
                raise ValueError('Wrong command')
            for command in self._commands[target_command]:
                probability = fuzz.partial_ratio(command, input)
                logger.debug('Probability of command {} for command case {} is {}'.format(target_command, command, probability))
                if probability >= self._min_confidence:
                    logger.debug('Matching command found.')
                    return True
            logger.info('Start phrase was not recognized')
            logger.debug('COMMAND RECOGNIZING FINISHED')
            return False

        else:
            command_probability = {key: 0 for key in self._commands.keys()}

            for command_key in self._commands.keys():
                for command in self._commands[command_key]:

                    c_probability = fuzz.partial_ratio(command, input)

                    if c_probability > command_probability[command_key]:
                        command_probability[command_key] = c_probability

            result = [key for key in command_probability.keys() if command_probability[key] == max(
                command_probability.values()) and command_probability[key] > self._min_confidence]

            logger.debug('The list of all available commands is: {}'.format(self._commands.keys()))
            logger.debug('The list of probabilities of each command is: {}'.format(command_probability))
            logger.debug('The list of found matching commands (better if there`s only one item) is: {}'.format(result))

            if result:
                logger.info('Recognized command is {}'.format(result[0]))
                logger.debug('COMMAND RECOGNIZING FINISHED')
                return result[0]
            logger.info('Command was not recognized')
            logger.debug('COMMAND RECOGNIZING FINISHED')
            return None

    def remove_command(self, string, command):
        """
        This method is used to remove command`s keywords from
        given text and return updated input.

        Here is an example of using this method:

        Let`s assume that when creating recognizer object you passed it such
        commands dictionary:
        command_dictionary = {'START': ['ok arius']}

        >>> rec.remove_command('ok auris could you tell me about enlarging the GDP', 'START')
        'could you tell me about enlarging the GDP'

        As you could see, method returns a string without a command.
        """
        logger.debug('STARTED CLEARING INPUT')
        if command is None:
            return string
        if command not in self._commands.keys():
            logger.info('Given wrong command: there`s no such command in the dictionary. Exiting')
            raise ValueError('Wrong command')
        # indicator if smth was changed. Used for debug purposes only.
        replaced = False
        for case in self._commands[command]:
            logger.debug('Clearing for {} and string is "{}"'.format(case, string))
            N = len(case.split())

            pre_grams = string.split()
            grams = [' '.join(pre_grams[i:i + N])
                     for i in xrange(len(pre_grams) - N)]

            for gram in grams:
                if fuzz.partial_ratio(gram, case) >= self._min_confidence:
                    logger.debug('Confidence for {} is {}'.format(gram, fuzz.partial_ratio(gram, string)))
                    string = string.replace(gram, '')
                    string = string.strip()
                    logger.debug('String is "{}"'.format(string))
                    replaced = True
        if not replaced:
            logger.info('Nothing to replace')
            logger.info('String with removed command phrase is: "{}"'.format(string))
            logger.debug('FINISHED CLEARING INPUT')
        # as we can have a string like 'test   test word' lets replace
        # all multiple whitespaces with one. The easiest way to achive
        # this and avoid RE is to use splitting string to a list and then
        # joining it with one whitespace. All multiple whitespaces won`t be
        # in the list as they are not treated as separate tokens while
        # splitting.
        return ' '.join(string.split())

if __name__ == "__main__":
    commands = {
        "ZOOM_IN": ['zoom in', 'increase', 'enlarge', 'zoom more'],
        "ZOOM_OUT": ['shrink', 'decrease', 'zoom less', 'zoom out'],
        "NO_ZOOM": ['normal size', 'zero zoom', 'no zoom', 'zoom reset', 'reset zoom'],
        "SCROLL_DOWN": ['page down', 'scroll down'],
        "SCROLL_UP": ['page up', 'scroll up'],
        "CANCEL": ['cancel', 'bye', 'thanks'],
        "WAIT": ['wait'],
        'START': ['ok arius', 'what the fuck']
    }
    rec = FuzzyRecognizer(commands, min_confidence=.7, debug=True)
    rec.recognize_command('ok aruis could you tell me about enlarging the GDP')
    rec.remove_command('ok aruis could you tell me about enlarging the GDP', 'START')
