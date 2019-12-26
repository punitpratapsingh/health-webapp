/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { browserHistory } from 'react-router';
import SimpleMDE from 'react-simplemde-editor';
import Markdown from 'react-markdown';
import { toast, ToastContainer } from 'react-toastify';
import {
	navigationIndexer,
	SERVER_IMAGE_URL,
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

class Symptoms extends Component {

	constructor(props) {
		super(props);
		this.files = {};

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);

		this.redirectEditingSymptom = this.redirectEditingSymptom.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
		triggerSwitchNavigation(navigationIndexer.gutWellness);
		triggerFetchEntity();
	}

	componentDidUpdate() {
		document.title = 'Symptoms';
	}

	componentDidMount() {
		document.title = 'Symptoms';
	}
	// navigate() {}
	addSymptoms() {
		window.location = '/addSymptoms';

	}
	fileSelectedHandler(e) {
		this.files[e.target.id] = e.target.files[0];
	}
	handleChanges(c) {
		this.setState({ mdeValue: c });
	}

	handleChange(value) {

		this.setState({ mdeValue: value });
	};

	handlePaginationNext(e) {
		e.preventDefault();
		const { symptoms: { page, limit, length }, triggerFetchEntity } = this.props;
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
		const { symptoms: { length, page, limit }, triggerFetchEntity } = this.props;
		if (page > 1) {
			triggerFetchEntity(page - 1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}

	/**
	 * this will trigger the updating as well as the
	 */
	redirectEditingSymptom(symptom) {
		const code = btoa(JSON.stringify(symptom));
		browserHistory.push(`/addSymptoms?code=${code}`);
	}


	render() {
		const {
			fetching,
			symptoms: {
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
			triggerToggleEditingSymptoms,
			triggerGenericUpdateSymptoms,
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
			<h2>Gut Wellness</h2>
			<button className='btn btn-success btn-sm' onClick={this.addSymptoms}>+ Add Symptoms</button>
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
						<th>Symptoms</th>
						<th>Picture</th>
						<th>Overview</th>
						<th>Potential Diesease</th>
						<th>Recommendations</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className=''>
					{
						data ?
							data.map((symptoms, index) => {
								return symptoms && symptoms && <tr className='order' key={`symptoms-${limit * (page - 1) + (index + 1)}`}>
									<td>{limit * (page - 1) + (index + 1)}</td>
									<td>{
										editing === symptoms._id ?
											<input
												type='text'
												className='custom-input'
												ref={name => this.name = name}
												defaultValue={symptoms.name}
											/> :
											symptoms.name || '-'
									}
									</td>
									<td>
										{editing !== symptoms._id && <Image width={100} height={100} image={symptoms && symptoms.coverPicture ? `${SERVER_IMAGE_URL}average/${symptoms.coverPicture}` : undefined} />}
										<p className='text-center'>{editing === symptoms._id &&
											<input id='image' type="file" accept="image/*" onChange={this.fileSelectedHandler} />}
										</p>
									</td>
									<td>
										<section >
											{
												editing === symptoms._id ?
													<SimpleMDE
														id="your-custom-id"
														// onChange={this.handleChange}
														ref={overview => this.overview = overview}
														// value={this.value}
														options={{
															autofocus: false,
															spellChecker: false,
															initialValue: symptoms.overview,
														}}
													/> :
													<Markdown source={symptoms.overview} /> || '-'
											}
										</section>
									</td>
									<td>
										{
											editing === symptoms._id ?
												<SimpleMDE
													id="potentialDiseases"
													// onChange={this.handleChange}
													ref={potentialDiseases => this.potentialDiseases = potentialDiseases}
													// value={this.value}
													options={{
														autofocus: false,
														spellChecker: false,
														initialValue: symptoms.potentialDiseases.join(', ')
													}}
												/> :
												<Markdown source={symptoms.potentialDiseases.join(', \n')} />
										}
									</td>
									<td>{
										editing === symptoms._id ?
											<SimpleMDE
												id="recommendation"
												// onChange={this.handleChange}
												ref={recommendation => this.recommendation = recommendation}
												// value={this.value}
												options={{
													autofocus: false,
													spellChecker: false,
													initialValue: symptoms.recommendation
												}}
											/> : <Markdown source={symptoms.recommendation} />
									}</td>
									<td>
										{
											!(editing === symptoms._id) &&
											<p>
												<button onClick={() => triggerGenericDeleteEntity(symptoms._id, page, limit)} className={'btn btn-sm app-btn btn-danger'}>
													Delete
														</button>&nbsp;
														<button
															// onClick={() => triggerToggleEditingSymptoms(symptoms._id, true)} className={'btn btn-sm btn-default'}
															onClick={() => this.redirectEditingSymptom(symptoms)} className={'btn btn-sm btn-default'}
														>
															Edit
														</button>
											</p>
										}
										{
											editing === symptoms._id &&
											<p>
												<button
													className='btn btn-sm btn-success'
													onClick={(e) => {
														e.preventDefault();
														triggerGenericUpdateSymptoms(symptoms._id, this.name.value, this.overview.value, this.recommendation.value, this.files && this.files.length && this.files[0]);
													}}>
													Save
													</button> &nbsp;
													<button
													className='btn btn-sm btn-warning'
													onClick={() => triggerToggleEditingSymptoms(undefined)}>
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
			endpoint: APPLICATION_ROUTES.SYMPTOMS_LIST,
		})),
		triggerGenericUpdateSymptoms: (id, name, overview, recommendation, picture) => dispatch(genericCreateEntity({
			payload: { symptomId: id, name, overview, recommendation },
			multipart: true,
			multipleImages: true,
			picture,
			endpoint: APPLICATION_ROUTES.UPDATE_SYMPTOMS,
			listingEndpoint: APPLICATION_ROUTES.SYMPTOMS_LIST,
		})),
		triggerToggleEditingSymptoms: (id) => dispatch(genericToggle({ toggleId: id })),
		triggerGenericDeleteEntity: (id, page, limit) => dispatch(genericDeleteEntity({
			payload: { symptomId: id },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.SYMPTOMS_DELETE,
			listingEndpoint: APPLICATION_ROUTES.SYMPTOMS_LIST,
		})),
		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
}

const mapStateToProps = state => {
	const { fetching, symptoms } = state;
	return { fetching, symptoms };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Symptoms);