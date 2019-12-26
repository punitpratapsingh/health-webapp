/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Image from '../../components/Image';
import FontAwesome from 'react-fontawesome';
import { Row, Col, Card, Input, Button } from 'reactstrap';

import { toast, ToastContainer } from 'react-toastify';
import {
    navigationIndexer,
    APPLICATION_ROUTES,
    SERVER_IMAGE_URL,
} from '../../constants';

import {
    switchNavigation,
    fetchEntity,
    genericActionEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Appointment extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.appointment);
        triggerFetchEntity();
    }

    componentDidUpdate() {
        document.title = 'Appoinment';
    }

    componentDidMount() {
        document.title = 'Appointment';
    }

    render() {
        const {
            fetching,
            appointment: {
                data,
                page,
                limit,
                length,
                error,
                success,
            },
            triggerFetchEntity,
            triggerGenericAcceptEntity,
            triggerGenericRejectEntity,
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

        return <section className='container'>
            <section className='row'>
                <h2>Appointment</h2>
            </section>
            <br />
            <section className='container'>
                <section className='row row-bg'>
                    <section className='col'>Serial No.</section>
                    <section className='col'>Patient</section>
                    <section className='col'>Time Slot</section>
                    <section className='col'>Disease Description</section>
                    <section className='col'>actions</section>

                </section>
            </section>
            <section className='container'>
                {
                    data ?
                        data.map((appointments, index) => {
                            return appointments && appointments && <section key={`appointments-${limit * (page - 1) + (index + 1)}`}>

                                <section className='row  order'>
                                    <section className='col data'>{limit * (page - 1) + (index + 1)}</section>
                                    <section className='col data'>{appointments.user.firstName}{appointments.user.lastname}</section>
                                    <section className='col data'>{appointments.slot.fromTimeMinutes}:{appointments.slot.fromTimeSeconds} - {appointments.slot.toTimeMinutes}:{appointments.slot.toTimeSeconds} </section>
                                    <section className='col data'>{appointments.diseaseDescription} </section>
                                    <section className='col data'>
											<button onClick={() => triggerGenericAcceptEntity(appointments._id,  page, limit)} className={'btn btn-sm btn-success'}>
												Accept
											</button>
											&nbsp;
                                            <button onClick={() => triggerGenericRejectEntity(appointments._id, page, limit)} className={'btn btn-sm btn-danger'}>
												Reject
											</button>
											&nbsp;
                                    </section>
                                </section>
                            </section>
                        }
                        ) :
                        <section>
                            <section colSpan="7">No data</section>
                        </section>
                }
            </section>
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
            endpoint: APPLICATION_ROUTES.LIST_APPOINTMENT,
        })),
        triggerGenericAcceptEntity: (id, page, limit) => dispatch(genericActionEntity({
			payload: { requestId: id , action:2 },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.ACTION_APPOINTMENT,
			listingEndpoint: APPLICATION_ROUTES.LIST_APPOINTMENT,
        })),
        triggerGenericRejectEntity: (id, page, limit) => dispatch(genericActionEntity({
			payload: { requestId: id, action: 3 },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.ACTION_APPOINTMENT,
			listingEndpoint: APPLICATION_ROUTES.LIST_APPOINTMENT,
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
)(Appointment);