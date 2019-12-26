import React from 'react';
import {
	Router,
	Route,
	// hashHistory,
	browserHistory,
} from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import InitStore from '../redux/store';

import LandingPage from './LandingPage';
import AdminAccountPage from './Account';
import DashboardPage from './Dashboard';
import Users from './Users';
import Symptoms from './Symptoms';
import AddSymptoms from './AddSymptoms';
import SubAdmin from './SubAdmin';
import AddStaff from './AddStaff';
import Blogs from './Blogs';
import AddBlog from './AddBlog';
import BlogDetail from './BlogDetail';
import Setting from './Setting';
import AboutUs from './AboutUs';
import Appointment from './Appointment';
import Timeslot from './Timeslot';
import Messages from './Messages';
import MessageReply from './MessageReply';
import Contactus from './Contactus';
import TermsAndCondition from './TermsAndCondition';
import PrivacyPolicy from './PrivacyPolicy';
import FoodAndLectins from './FoodAndLectins';
import Comment from './Comment';
// const history = syncHistoryWithStore(hashHistory, InitStore());
export default () => {
	return <Provider store={InitStore()}>
		<Router history={browserHistory}>
			<Route path="/" component={LandingPage} />

			<Route path="/adminAccount" strict={true} component={AdminAccountPage}>
				<Route path='/account' component={DashboardPage} />
				<Route path='/dashboard' component={DashboardPage} />
				<Route path='/users' component={Users} />
				<Route path='/gutWellness' component={Symptoms} />
				<Route path='/addSymptoms' component={AddSymptoms} />
				<Route path='/subAdmin' component={SubAdmin} />
				<Route path='/addStaff' component={AddStaff} />
				<Route path='/blogs' component={Blogs} />
				<Route path='/addBlog' component={AddBlog} />
				<Route path='/blogDetail' component={BlogDetail} />
				<Route path='/appointment' component={Appointment} />
				<Route path='/setting'  component={Setting} />
				<Route path='/timeslot' component={Timeslot} />
				<Route path='/messages' component={Messages} />
				<Route path='/messageReply' component={MessageReply} />
				<Route path='/aboutUs' component={AboutUs} />
				<Route path='/contactUs' component={Contactus} />
				<Route path='/termsAndCondition' component={TermsAndCondition} />
				<Route path='/privacyPolicy' component={PrivacyPolicy} />
				<Route path='/foodAndLectins' component={FoodAndLectins} />
				<Route path='/comment' component={Comment} />

			</Route> 
		</Router>
	</Provider>;
}
