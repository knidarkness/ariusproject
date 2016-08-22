from fsm import FSM

states_dict = {}

states_dict['idle'] = [('cancel', None, 'idle'), ('request', None, 'searching_data')]
states_dict['searching_data'] = [('cancel', None, 'idle'), ('found', None, 'displaying_data'), ('not_found', None, 'search_failed')]
states_dict['search_failed'] = [('cancel', None, 'idle'), ('request', None, 'searching_data')]
states_dict['displaying_data'] = [('cancel', None, 'idle'), ('command', None, 'displaying_data'), ('request', None, 'searching_data')]

statemachine = FSM('idle', states_dict, 'idle')
