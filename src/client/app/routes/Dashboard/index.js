import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from '../../components/LoadingOverlay';
import { toast, ToastContainer } from 'react-toastify';

import {
	CardColumns,
	Card,
	CardBody,
	CardTitle,
	CardText,
} from 'reactstrap';
import { navigationIndexer } from '../../constants';
import { switchNavigation, fetchStatistics } from '../../redux/actions';
import './index.scss';

class Dashboard extends Component {

	constructor() {
		super();
	}

	componentWillMount() {
        const {  triggerFetchStatics } = this.props;
        document.title = 'Dashboard';
		triggerFetchStatics();
	    }

  

	render(){
		
		const { statistics, fetching } = this.props;
		return statistics ? <section className='dashboard-container'>
		{LoadingOverlay({ show: fetching })}
		<ToastContainer />
			<h2>Dashboard</h2>
			<hr/>
			<CardColumns>
				<Card style={{ borderRadius: 10 }}>
					<CardBody className='text-center'>
						<CardTitle>Total Users</CardTitle>
						<CardText>
							<h1 className='color'>
								Active: {statistics.users.active}
							</h1>
							<h1 className='font del'>
								Deleted: {statistics.users.deleted}
							</h1>
							<h1 className='font'>
								Blocked: {statistics.users.blocked}
							</h1>
						</CardText>
					</CardBody>
				</Card>
                <Card style={{ borderRadius: 10 }}>
					<CardBody className='text-center'>
						<CardTitle>Total Staff</CardTitle>
						<CardText>
						<h1 className='color'>
								Active: {statistics.staff.totalStaff}
							</h1>
							<h1 className='font del'>
								Deleted: {statistics.staff.deleted}
							</h1>
						</CardText>
					</CardBody>
				</Card>
				<Card  style={{ borderRadius: 10 }}>
					<CardBody className='text-center'>
						<CardTitle>Consultation Request</CardTitle>
						<CardText>
							<h1 className='font'>
								Total Request: {statistics.totalRequests.request}
							</h1>
						</CardText>
					</CardBody>
				</Card>
			</CardColumns>
		</section>:
			fetching ? <p>Loading....</p>: <p>Nothing found.</p>;
	}
}

const mapDispatchToProps = dispatch => {
    return {
		triggerFetchStatics: () => dispatch(fetchStatistics({})),
    };
}
const mapStateToProps = state => {
    const { fetching, dashboard : { statistics }} = state;
    return { fetching, statistics};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);