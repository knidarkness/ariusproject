import itertools


class FSM(object):
    """
    This class represents a finite states machine in Python 3.
    Can be used in a lot of different usecases such as:
    game AI, any type of event-orintied applications and etc.
    States are stored in dictionary states_dict as:
    [key=current_state]:[(message, prev_state, end_state)]
    """

    def __init__(self, init_state, states_dict, prev_state=''):
        """
        Usual init function. The onle interesting thing is how we generate
        a list of all allowed messages. I take a message from every state case
        and then just convert it -> set -> list to remove the doubles and etc.
        """
        super(FSM, self).__init__()
        self.__state = init_state
        self.__prev_state = prev_state

        message_list = list(set((itertools.chain(
            *[[message[0] for message in states_dict[state]] for state in states_dict.keys()]))))
        self.__message_list = message_list
        self.__states_dict = states_dict
        self.__current_message = None

    def handle_message(self, message):
        """
        The function to handle the input messages to state machine.
        Check if the message is in the list of allowed messages, if yes
        then we process it with update() function, if not - raise ValueError.
        """
        if message in self.__message_list:
            self.__current_message = message
            self.update()
            return 0
        else:
            raise ValueError('This message is not in allowed messages')

    def update(self):
        """
        This function updates a state of the final state machine according to
        the last message. Here`s no message check or failure protection because
        we check the message when get it from user.
        """
        for i in xrange(len(self.__states_dict[self.__state])):
            # print(self.states_dict[self.state][i])
            case = self.__states_dict[self.__state][i]
            p_state = self.__prev_state
            # print(case)
            if self.__current_message == case[0] and (case[1] == p_state or case[1] == None):
                self.__prev_state = self.__state
                self.__state = case[2]
                return 0

    def get_state(self):
        return self.__state

    def get_prev_state(self):
        return self.__prev_state