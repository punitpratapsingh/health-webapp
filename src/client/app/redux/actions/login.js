import { LOGIN_FETCH, LOGIN_PAYLOAD, FETCHING } from './actionTypes';
import { fetchAction } from '.';
import { APPLICATION_ROUTES } from '../../constants';
import axios from 'axios';

/** 
 * trigger admin login
 * @param {String} username
 * @param {String} password
*/
export const userLogin = ({ username, password }) => (dispatch) => {
	const body = { username, password };
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.USER_LOGIN, body)
		.then((response) => {
			// handle the server success response
			const { data: { code, message, data } } = response;
			console.log(response);
			dispatch({ type: LOGIN_PAYLOAD, response, code });
			dispatch(fetchAction({ fetching: false }));

		}).catch((err) => {
			// handle no connection to the server
			dispatch(fetchAction({ fetching: false }));
		})
}


// staff
export const staffLogin = ({ email, password }) => (dispatch) => {
	const body = { email, password };
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.STAFF_LOGIN, body)
		.then((response) => {
			// handle the server success response
			const { data: { code, message, data } } = response;
			console.log(response);
			dispatch({ type: LOGIN_PAYLOAD, response, code });
			dispatch(fetchAction({ fetching: false }));

		}).catch((err) => {
			// handle no connection to the server
			dispatch(fetchAction({ fetching: false }));
		})
}
