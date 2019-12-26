/**
 * action reducer for users listing admin page
 */
import { APPLICATION_ROUTES } from '../../constants';
import {
	ERROR,
	SUCCESS,
	TRANSIENT_TOGGLE,
	STATE_PROPERTY,

} from '../actions/actionTypes';

const defaultState = {
	data: undefined,
	conversations: undefined,
	conversationsPage: 0,
	conversationsLimit: 1000,
	page: 0,
	limit: 30,
	length: 0,
	error: undefined,
	success: undefined,
	activeConversation: undefined,
	activeConversationPayload: undefined,
};
/**
 * default state handler/reducer for entity
 */
export default (state = defaultState, {
	type,
	data = [],
	page = 1,
	limit = 10,
	error,
	toggleId,
	success,
	property,
	value,
}) => {
	switch (type) {
		case APPLICATION_ROUTES.STAFF_MESSAGE_LIST:
			return Object.assign({}, state, {
				data,
				page,
				limit,
				length: data.length,
			});
		case APPLICATION_ROUTES.LIST_CONVERSATIONS:
			return Object.assign({}, state, {
				conversations: data,
				conversationsPage: page,
				conversationLimit: limit,
				length: data.length,
			});
		case TRANSIENT_TOGGLE:
			return Object.assign({}, state, { activeConversation: toggleId });
		case STATE_PROPERTY:
			const propertyObject = {};
			propertyObject[property] = value;
			return Object.assign({}, state, propertyObject);
		case ERROR:
			return Object.assign({}, state, { error });
		case SUCCESS:
			return Object.assign({}, state, { success });
		default:
			return state;
	}
};
