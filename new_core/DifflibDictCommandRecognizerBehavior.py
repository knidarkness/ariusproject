from AbstractDictCommandRecognizerBehavior import AbstractDictCommandRecognizerBehavior

import sys
sys.path.append("../")
from logger import Logger
logger = Logger("Core")


class DifflibDictCommandRecognizerBehavior(AbstractDictCommandRecognizerBehavior):
    def proceedInput(self, command):
        return 'a'

    def recognize_command(self, user_input, target_command=None):
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
                probability = self.__get_confidence_of_match(command, user_input)
                logger.debug('Probability of command {} for command case {} is {}'.format(
                    target_command, command, probability))
                if probability >= self._min_confidence:
                    logger.debug('Matching command found.')
                    return True
            logger.info('Start phrase was not recognized')
            logger.debug('COMMAND RECOGNIZING FINISHED')
            return False

        else:
            command_probability = {key: 0 for key in self._commands.keys()}

            for command_key in self._commands.keys():
                for case in self._commands[command_key]:
                    N = len(case.split())

                    pre_grams = user_input.split()
                    grams = [' '.join(pre_grams[i:i + N])
                             for i in range(len(pre_grams) - N + 1)]

                    for gram in grams:
                        confidence = self.__get_confidence_of_match(case, gram)
                        if confidence >= command_probability[command_key]:
                            command_probability[command_key] = confidence

            result = [key for key in command_probability.keys() if command_probability[key] == max(
                command_probability.values()) and command_probability[key] > self._min_confidence]

            logger.debug('The list of all available commands is: {}'.format(self._commands.keys()))
            logger.debug('The list of probabilities of each command is: {}'.format(command_probability))
            logger.debug('The list of found matching commands '
                         '(better if there`s only one item) is: {}'.format(result))

            if result:
                logger.info('Recognized command is {} and confidence for it is {}'
                            .format(result[0], command_probability[result[0]]))
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
                     for i in range(len(pre_grams) - N)]

            for gram in grams:
                confidence = self.__get_confidence_of_match(case, gram)
                if confidence >= self._min_confidence:
                    logger.debug('Confidence for {} is {}'.format(gram, confidence))
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
