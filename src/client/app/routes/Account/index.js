import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
// loading assets
import Dashboard from '../Dashboard';
import Image from '../../components/Image';
import logo from '../../assets/images/logo.png';
import './index.scss';

class Account extends Component {
	constructor(props) {
		super(props);

		this.handleSwitch = this.handleSwitch.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleSwitch(e) {
		const { triggerSwitchNavigation } = this.props;
		e.preventDefault();
		const name = e.target.name  || e.target.id;
		browserHistory.push(`/${name}`);
		triggerSwitchNavigation(navigationIndexer[name]);
	}

	componentWillMount() {
		if (!window.localStorage.accessToken) {
			window.location = '/';
		}
	}

	componentDidMount() {
		document.title = 'Admin Account';
	}

	handleLogout(e) {
		e.preventDefault();
		const { type } = this.props;
		localStorage.removeItem('data');
		localStorage.removeItem('accessToken');
		window.location = '/';
	}

	render() {
		const { active } = this.props;
		return <section className=''>
			<section className='leftNavigation'>
				<section className="navigationMenu">
					<p className='text-center'><Image image={logo} /></p>
					{/* <p className="navigationHeader">LOGGED USER</p>
					<i style={{ color: 'silver' }}>{localStorage.getItem('user')}</i> */}
				</section>
				<section className="navigationMenu">
					<button name='dashboard' className={`navigationItem ${active === navigationIndexer.dashboard ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='' name="line-chart" onClick={this.handleSwitch} />&nbsp; Dashboard
					</button>
				</section>
				<section className="navigationMenu">
					<button name='users' className={`navigationItem ${active === navigationIndexer.users ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='' name="users" onClick={this.handleSwitch} />&nbsp; Users
					</button>
				</section>
				<section className="navigationMenu">
					<button name='gutWellness' className={`navigationItem ${active === navigationIndexer.gutWellness ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='' name="medkit" onClick={this.handleSwitch} />&nbsp; Gut Wellness
					</button>
				</section>
				<section className="navigationMenu">
					<button name='subAdmin' className={`navigationItem ${active === navigationIndexer.subAdmin ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
				<FontAwesome id='' name="users" onClick={this.handleSwitch} />&nbsp; Sub Admin
					</button>
				</section>
				<section className="navigationMenu">
					<button name='messages' className={`navigationItem ${active === navigationIndexer.messages ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='' name="comments" onClick={this.handleSwitch} />&nbsp; Messages
					</button>
				</section>
				<section className="navigationMenu">
					<button name='appointment' className={`navigationItem ${active === navigationIndexer.appointment ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='' name="calendar" onClick={this.handleSwitch} />&nbsp; Appointment
					</button>
				</section>
				<section className="navigationMenu">
					<button name='blogs' className={`navigationItem ${active === navigationIndexer.blogs ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='' name="rss" onClick={this.handleSwitch} />&nbsp; Blogs
					</button>
				</section>
				<section className="navigationMenu">
					<button name='setting' className={`navigationItem ${active === navigationIndexer.setting ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='' name="edit" onClick={this.handleSwitch} />&nbsp; Settings
					</button>
				</section>
				<section className="navigationMenu">
					{/* <p className="navigationHeader">Account</p> */}
					<button name='logout' className={`navigationItem ${active === navigationIndexer.constants ? 'activeItem' : ''}`} onClick={this.handleLogout}>
						<FontAwesome id='logout' name="sign-out" onClick={this.handleSwitch} />&nbsp; Logout
					</button>
				</section>
			</section>
			<section className='dynamicContainer'>
				{this.props.children || <Dashboard />}
			</section>
		</section>;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
	}
}

const mapStateToProps = state => {
	const { fetching, navigation: { active } } = state;
	return { fetching, active };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
// export default AdminIndex;
