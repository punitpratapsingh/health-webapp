/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import {
	navigationIndexer,
	SERVER_BASE_URL,
	APPLICATION_ROUTES,
	ADMIN_USER,
} from '../../constants';
import LoadingOverlay from '../../components/LoadingOverlay';
import Pagination from '../../components/Pagination';
import Image from '../../components/Image';
import {
	switchNavigation,
	fetchEntity,
	genericBlockEntity,
	genericDeleteEntity,
	genericToggle,
	nullifyError,
	nullifySuccess,
} from '../../redux/actions';
import './index.scss';
import { SERVER_IMAGE_URL, } from '../../constants';

class Subadmin extends Component {

	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
		//this.navigate = this.navigate.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
		triggerSwitchNavigation(navigationIndexer.subAdmin);
		triggerFetchEntity();
	}

	componentDidUpdate() {
		document.title = 'Staff';
	}

	componentDidMount() {
		document.title = 'Staff';
	}
    // navigate() {}
    addStaff() {
        window.location = '/addStaff';
    }

	handlePaginationNext(e) {
		e.preventDefault();
		const { users: { page, limit, length }, triggerFetchEntity } = this.props;
		toast.dismiss();
		if (length < limit) {
			// no more data
			toast.info('No more data');
		} else {
			// console.log(`fetch page ${page+1} with ${limit} items`);
			triggerFetchEntity(page+1, limit);
		}
	}

	handlePaginationBack(e){
		e.preventDefault();
		toast.dismiss();
		const { users: { length, page, limit }, triggerFetchEntity } = this.props;
		if (page > 1) {
			triggerFetchEntity(page-1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}


	render() {
		const {
			fetching,
			users: {
				editing,
				data,
				page,
				limit,
				length,
				error,
				success,
			},
			triggerFetchEntity,
			triggerGenericDeleteEntity,
			triggerGenericBlockEntity,
			triggerGenericToggle,
			triggerNullifyError,
			triggerNullifySuccess,
		} = this.props;

		if (error) {
			toast.dismiss();
			triggerNullifyError();
			toast.error(error);
		}
		if (success) {
			toast.dismiss();
			triggerNullifySuccess();
			toast.success(success);
		}

		return <section>
			{ LoadingOverlay({ show: fetching }) }
			<ToastContainer />
			<h2>Staff</h2>
            <button className='btn btn-success btn-sm' onClick={this.addStaff}>+ Add Staff</button>
			{Pagination({
				page,
				limit,
				length,
				nextHandler: this.handlePaginationNext,
				previousHander: this.handlePaginationBack,
				alignment: 'text-right'
			})}
			<br />
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8, cursor: 'pointer' }}>
				<thead>
					<tr className='data'>
						<th className='first-column'>#</th>
						<th>Staff Member</th>
						<th>Qualification</th>
						<th>Experience</th>
                        <th>Specialist In</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className=''>
					{
						data ?
							data.map((users, index) => {
								return users && users && <tr key={`users-${limit * (page - 1) + (index + 1)}`}>
									<td>{limit * (page - 1) + (index + 1)}</td>
									<td>{users.firstName} {users.lastName}</td>
										<td>{users.certification}</td>
										<td>{users.experience}</td>
										<td>{users.speciality}</td>
										<td>
											<button onClick={() => triggerGenericDeleteEntity(users._id, page, limit)} className={'btn btn-sm btn-danger'}>
												Delete
											</button>
											&nbsp;
										</td>
									</tr>
								}
							) :
							<tr>
								<td colSpan="7">No data</td>
							</tr>
					}
				</tbody>
			</Table>
			{Pagination({
				page,
				limit,
				length,
				nextHandler: this.handlePaginationNext,
				previousHander: this.handlePaginationBack,
			})}
		</section>
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
		triggerFetchEntity: (page, limit, payload) => dispatch(fetchEntity({
			payload: {admin: true, role: 2 },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.USERS_LIST,
		})),
		triggerGenericDeleteEntity: (id, page, limit) => dispatch(genericDeleteEntity({
			payload: { usersId: id },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.DELETE_USER,
			listingEndpoint: APPLICATION_ROUTES.USERS_LIST,
		})),
		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
}

const mapStateToProps = state => {
	const { fetching, users } = state;
	return { fetching, users };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Subadmin);