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

class Comment extends Component {

	constructor(props) {
		super(props);
		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
		triggerSwitchNavigation(navigationIndexer.comment);
		triggerFetchEntity();
	}

	componentDidUpdate() {
		document.title = 'Comment';
	}

	componentDidMount() {
		document.title = 'Comment';
	}
	handlePaginationNext(e) {
		e.preventDefault();
		const { comment: { page, limit, length }, triggerFetchEntity } = this.props;
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
		const { comment: { length, page, limit }, triggerFetchEntity } = this.props;
		if (page > 1) {
			triggerFetchEntity(page - 1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}


	render() {
		const {
			fetching,
			comment: {
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
			<h2>Comment</h2>					
			{Pagination({
				page,
				limit,
				length,
				nextHandler: this.handlePaginationNext,
				previousHander: this.handlePaginationBack,
				alignment: 'text-right'
			})}
			<hr />
		 <section className='container'>
          
         </section>
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
			endpoint: APPLICATION_ROUTES.COMMENT_LIST,
		})),
	
		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
}

const mapStateToProps = state => {
	const { fetching, comment } = state;
	return { fetching, comment };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Comment);