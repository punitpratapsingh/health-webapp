/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect }  from 'react-redux';
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


class FoodAndLectins extends Component {

	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
		this.clear = this.clear.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
		triggerSwitchNavigation(navigationIndexer.foodAndLectins);
		triggerFetchEntity();
	}

	componentDidUpdate() {
		document.title = 'Food And Lectins';
	}

	componentDidMount() {
		document.title = 'Food And Lectins';
	}
	clear(){
        this.name.value = '';
        this.level.value = '';
        this.description.value = '';
	}

	handlePaginationNext(e) {
		e.preventDefault();
		const { food: { page, limit, length }, triggerFetchEntity } = this.props;
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
		const { food: { length, page, limit }, triggerFetchEntity } = this.props;
		if (page > 1) {
			triggerFetchEntity(page-1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}


	render() {
		const {
			fetching,
			foodAndLections: {
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
			triggerToggleEditingFood,
			triggerGenericUpdateFood,
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
			{ LoadingOverlay({ show: fetching }) }
			<ToastContainer />
			<h2>Food And Lectins</h2>
            <section>
            <Row className="custum">
                 <Col sm="2">Name</Col>
                 <Col sm="3">
                     <input
                         className='form-control'
                         type="text"
						 placeholder="Name of food"
						 ref={name => this.name = name}

						 />
                 </Col>&nbsp;
				 <Col sm="2">Level</Col>
                 <Col sm="3">
                     <input
                         className='form-control'
                         type="text"
                         placeholder="Level of food 1,2 or3"
                         ref={level => this.level = level}
                      />
                 </Col>
                 
             </Row>
                <Row className="custum">
                 <Col sm="2">Description</Col>
                 <Col sm="8">
                     <textarea
                         className='form-control'
                         type="text"
                         placeholder="Description of food"
                         ref={description => this.description = description}
                      />
                 </Col>&nbsp;
               
				</Row>
				 <Row className=''>
                    <Col className='row ' >
                        <p className=''>
                            <button
                                className='btn btn-sm btn-success '
                                onClick={(e) => {
                                    e.preventDefault();
                                    triggerCreateEntity(this.name.value, this.level.value, this.description.value)
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
					<Col sm="6"></Col>

                </Row>
				<hr className='bg'></hr>
            </section>
			{Pagination({
				page,
				limit,
				length,
				nextHandler: this.handlePaginationNext,
				previousHander: this.handlePaginationBack,
				alignment: 'text-right'
			})}
			<hr/>
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8, cursor: 'pointer' }}>
				<thead>
					<tr className='data'>
						<th className='first-column'>#</th>
						<th>Name</th>
						<th>Level</th>
                        <th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className=''>
					{
						data ?
							data.map((food, index) => {
								return food && food && <tr key={`food-${limit * (page - 1) + (index + 1)}`}>
									<td>{limit * (page - 1) + (index + 1)}</td>
									<td>{
										editing === food._id ? 
										<input
										type='text'
										defaultValue={food.name}
										ref ={ name => this.name = name}
										/> : food.name || '-'
									}</td>
										<td>{
										editing === food._id ? 
										<input
										type='text'
										defaultValue={food.level}
										ref ={ level => this.level = level}
										/> : food.level || '-'
									}</td>
                                        <td>{
										editing === food._id ? 
										<input
										type='text'
										defaultValue={food.description}
										ref ={ description => this.description = description }
										/> : food.description || '-'
									}</td>

										<td>
										{
											!(editing === food._id) &&
											<p>
												<button onClick={() => triggerGenericDeleteEntity(food._id, page, limit)} className={'btn btn-sm app-btn btn-danger'}>
													Delete
														</button>&nbsp;
														<button onClick={() => triggerToggleEditingFood(food._id, true)} className={'btn btn-sm btn-default'}>
													Edit
														</button>
											</p>
										}
										{
											editing === food._id &&
											<p>
												<button
													className='btn btn-sm btn-success'
													onClick={(e) => {
														e.preventDefault();
														triggerGenericUpdateFood(food._id, this.name.value, this.level.value, this.description.value);
													}}>
													Save
													</button> &nbsp;
													<button
													className='btn btn-sm btn-warning'
													onClick={() => triggerToggleEditingFood(undefined)}>
													Cancel
													</button>
											</p>
										}
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
			endpoint: APPLICATION_ROUTES.LIST_FOOD,
		})),
		triggerGenericDeleteEntity: (id, page, limit) => dispatch(genericDeleteEntity({
			payload: { foodId: id },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.DELETE_FOOD,
			listingEndpoint: APPLICATION_ROUTES.LIST_FOOD,
		})),
		triggerGenericUpdateFood: (id,name, level, description) => dispatch(genericCreateEntity({
			payload: { foodId: id, name,level, description},
			endpoint: APPLICATION_ROUTES.UPDATE_FOOD,
			listingEndpoint: APPLICATION_ROUTES.LIST_FOOD,
		})),
		triggerToggleEditingFood: (id) => dispatch(genericToggle({ toggleId: id })),
        triggerCreateEntity: (name, level, description) => dispatch(genericCreateEntity({
            payload: {
             name,
             level,
             description,
            },
			endpoint: APPLICATION_ROUTES.ADD_FOOD,
			listingEndpoint: APPLICATION_ROUTES.FOOD_LIST,
        })),

		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
}

const mapStateToProps = state => {
	const { fetching, foodAndLections } = state;
	return { fetching, foodAndLections };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FoodAndLectins);