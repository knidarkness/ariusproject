from fsm import FSM

states_dict = {}

states_dict['idle'] = [('request', None, 'searching_data')]
states_dict['searching_data'] = [('cancel', None, 'idle'), ('found', None, 'displaying_data'), ('not_found', None, 'search_failed')]
states_dict['search_failed'] = [('cancel', None, 'idle'), ('external', None, 'external_search'), ('request', None, 'searching_data')]
states_dict['displaying_data'] = [('cancel', None, 'idle'), ('command', None, 'displaying_data'), ('request', None, 'searching_data')]
states_dict['external_search'] = [('cancel', None, 'idle'), ('found', None, 'displaying_data'), ('not_found', None, 'idle')]

statemachine = FSM('idle', states_dict, 'idle')