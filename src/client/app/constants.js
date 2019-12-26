/**
 * This file defines application level constants
 */
import { SERVER, IMAGE_URL, SOCKET_URL, ADMIN_USER } from './statics';

export const SERVER_BASE_URL = SERVER;
export const SERVER_IMAGE_URL = IMAGE_URL;
export const SERVER_SOCKET_URL = SOCKET_URL;
export const SERVER_ADMIN_USER = ADMIN_USER;

export const APPLICATION_ROUTES = {
	// admin URLS
	USER_LOGIN: `${SERVER_BASE_URL}admin/authenticate`,
	STAFF_LOGIN: `${SERVER_BASE_URL}staff/login`,
	DASHBOARD_STATISTICS: `${SERVER_BASE_URL}admin/stats`,
	USERS_LIST: `${SERVER_BASE_URL}admin/listUser`,
	DELETE_USER: `${SERVER_BASE_URL}admin/deleteUser`,
	BLOCK_USER: `${SERVER_BASE_URL}admin/blockUser`,
	SYMPTOMS_LIST: `${SERVER_BASE_URL}admin/listSymptoms`,
	SYMPTOMS_DELETE: `${SERVER_BASE_URL}admin/deleteSymptoms`,
	ADD_SYMPTOMS: `${SERVER_BASE_URL}admin/addSymptoms`,
	UPDATE_SYMPTOMS: `${SERVER_BASE_URL}admin/updateSymptoms`,
	BLOGS_LIST: `${SERVER_BASE_URL}admin/listBlogs`,
	BLOGS_ADD: `${SERVER_BASE_URL}admin/addBlogs`,
	BLOG_DELETE: `${SERVER_BASE_URL}admin/deleteBlog`,
	BLOG_UPDATE: `${SERVER_BASE_URL}admin/updateBlog`,
	ADD_STAFF: `${SERVER_BASE_URL}admin/addStaff`,
	MESSAGES_LIST: `${SERVER_BASE_URL}admin/messageList`,
	STAFF_MESSAGE_LIST: `${SERVER_BASE_URL}staff/listChatUsers`,
	MESSAGES_REPLY: `${SERVER_BASE_URL}admin/messageReply`,
	LIST_CONVERSATIONS: `${SERVER_BASE_URL}admin/listAdminConversation`,
	LIST_APPOINTMENT: `${SERVER_BASE_URL}admin/listAppointment`,
	ACTION_APPOINTMENT: `${SERVER_BASE_URL}admin/actionAppointment`,
	SLOT_LIST: `${SERVER_BASE_URL}admin/listSlot`,
	ADD_SLOTS: `${SERVER_BASE_URL}admin/addSlot`,
	DELETE_SLOT: `${SERVER_BASE_URL}admin/deleteSlot`,
	LIST_STATIC: `${SERVER_BASE_URL}admin/listStatic`,
	ADD_STATIC: `${SERVER_BASE_URL}admin/createStatic`,
	DELETE_STATIC: `${SERVER_BASE_URL}admin/deleteStatic`,
	UPDATE_STATIC: `${SERVER_BASE_URL}admin/updateStatic`,
	ADD_FOOD: `${SERVER_BASE_URL}admin/createFood`,
	DELETE_FOOD: `${SERVER_BASE_URL}admin/deleteFood`,
	LIST_FOOD: `${SERVER_BASE_URL}admin/listFood`,
	UPDATE_FOOD: `${SERVER_BASE_URL}admin/updateFood`,
};

export const navigationIndexer = {
	dashboard: 1,
	users: 2,
	gutWellness: 3,
	addSymptoms: 4,
	subAdmin: 5,
	addStaff: 6,
	messages: 7,
	appointment: 8,
	blogs: 9,
	addBlogs: 10,
	blogDetail: 11,
	setting: 12,
	timeslot: 13,
	contactUs: 14,
	messageReply: 15,
	termsAndCondition: 16,
	privacyPolicy: 17,
	foodAndLectins: 18,
	comment: 19,

};
