/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import {
	navigationIndexer,
	APPLICATION_ROUTES,
} from '../../constants';
import LoadingOverlay from '../../components/LoadingOverlay';
import Pagination from '../../components/Pagination';
import Image from '../../components/Image';
import {
	switchNavigation,
	fetchEntity,
	genericDeleteEntity,
	genericCreateEntity,
	genericToggle,
	nullifyError,
	nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Timeslot extends Component {

	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
		this.clear = this.clear.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
		triggerSwitchNavigation(navigationIndexer.timeslot);
		triggerFetchEntity();
	}

	componentDidUpdate() {
		document.title = 'Timeslot';
	}

	componentDidMount() {
		document.title = 'Timeslot';
	}
	clear() {
		this.toH.value = '';
		this.toM.value = '';
		this.fromH.value = '';
		this.fromM.value = '';

	}

	handlePaginationNext(e) {
		e.preventDefault();
		const { timeslot: { page, limit, length }, triggerFetchEntity } = this.props;
		toast.dismiss();
		if (length < limit) {
			// no more data
			toast.info('No more data');
		} else {
			// console.log(`fetch page ${page+1} with ${limit} items`);
			triggerFetchEntity(page + 1, limit);
		}
	}

	handlePaginationBack(e) {
		e.preventDefault();
		toast.dismiss();
		const { timeslot: { length, page, limit }, triggerFetchEntity } = this.props;
		if (page > 1) {
			triggerFetchEntity(page - 1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}


	render() {
		const {
			fetching,
			appointment: {
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
			triggerGenericToggle,
			triggerCreateEntity,
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
			{LoadingOverlay({ show: fetching })}
			<ToastContainer />
			<h2>Timeslot</h2>
			<section>
				<Row className="custum">
					<Col sm="2">To</Col>
					<Col sm="3">
						<input
							className='form-control'
							type="text"
							placeholder="Hours"
							ref={fromH => this.fromH = fromH}

						/>
					</Col>&nbsp;
                 <Col sm="3">
						<input
							className='form-control'
							type="text"
							placeholder="Minutes"
							ref={fromM => this.fromM = fromM}

						/>
					</Col>
				</Row>
				<Row className="custum">
					<Col sm="2">From</Col>
					<Col sm="3">
						<input
							className='form-control'
							type="text"
							placeholder="Hours"
							ref={toH => this.toH = toH}
						/>
					</Col>&nbsp;
                 <Col sm="3">
						<input
							className='form-control'
							type="text"
							placeholder="Minutes"
							ref={toM => this.toM = toM}
						/>
					</Col>
				</Row>
				<Row className=''>
					<Col className='row ' >
						<p className=''>
							<button
								className='btn btn-sm btn-success '
								onClick={(e) => {
									e.preventDefault();
									triggerCreateEntity(this.fromH.value, this.fromM.value, this.toH.value, this.toM.value)
								}}>
								Add
                			</button>&nbsp;
							<button
								className='btn btn-sm btn-secondary  '
								onClick={this.clear}>
								Clear
                			</button>
						</p>
					</Col>

				</Row>
			</section>
			{Pagination({
				page,
				limit,
				length,
				nextHandler: this.handlePaginationNext,
				previousHander: this.handlePaginationBack,
				alignment: 'text-right'
			})}
			<hr />
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8, cursor: 'pointer' }}>
				<thead>
					<tr className='data'>
						<th className='first-column'>#</th>
						<th>To</th>
						<th>from</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className=''>
					{
						data ?
							data.map((timeslot, index) => {
								return timeslot && timeslot && <tr key={`timeslot-${limit * (page - 1) + (index + 1)}`}>
									<td>{limit * (page - 1) + (index + 1)}</td>
									<td>{timeslot.fromTimeMinutes}:{timeslot.fromTimeSeconds}</td>
									<td>{timeslot.toTimeMinutes}:{timeslot.toTimeSeconds}</td>
									<td>
										<button onClick={() => triggerGenericDeleteEntity(timeslot._id, page, limit)} className={'btn btn-sm btn-danger'}>
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
			payload,
			page,
			limit,
			endpoint: APPLICATION_ROUTES.SLOT_LIST,
		})),
		triggerGenericDeleteEntity: (id, page, limit) => dispatch(genericDeleteEntity({
			payload: { timeslotId: id },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.DELETE_SLOT,
			listingEndpoint: APPLICATION_ROUTES.SLOT_LIST,
		})),
		triggerCreateEntity: (fromTimeMinutes, fromTimeSeconds, toTimeMinutes, toTimeSeconds) => dispatch(genericCreateEntity({
			payload: {
				fromTimeMinutes,
				fromTimeSeconds,
				toTimeMinutes,
				toTimeSeconds
			},
			endpoint: APPLICATION_ROUTES.ADD_SLOTS,
			listingEndpoint: APPLICATION_ROUTES.SLOT_LIST,
		})),

		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
}

const mapStateToProps = state => {
	const { fetching, appointment } = state;
	return { fetching, appointment };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timeslot);