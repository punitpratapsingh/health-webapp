/**
 * feedbacks buttonsting component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Row, Col, Card, Input, button } from 'reactstrap';

import { toast, ToastContainer } from 'react-toastify';
import {
    navigationIndexer,
    SERVER_BASE_URL,
    APPbuttonCATION_ROUTES,
} from '../../constants';

import {
    switchNavigation,
    genericCreateEntity,
    nulbuttonfyError,
    nulbuttonfySuccess,
} from '../../redux/actions';
import './index.scss';

class Setting extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { triggerSwitchNavigation } = this.props;
        triggerSwitchNavigation(navigationIndexer.setting);
    }

    componentDidUpdate() {
        document.title = 'Setting';
    }

    componentDidMount() {
        document.title = 'Setting';
    }
    render() {
        const {
            fetching,
            users: {
                error,
                success,
            },
            triggerNulbuttonfyError,
            triggerNulbuttonfySuccess,
        } = this.props;

        if (error) {
            toast.dismiss();
            triggerNulbuttonfyError();
            toast.error(error);
        }
        if (success) {
            toast.dismiss();
            triggerNulbuttonfySuccess();
            toast.success(success);
        }

        return <section>
            <h1>Settings</h1>

            <p className='con '>
                <button className='btn btn-link' onClick={() => browserHistory.push('/aboutus')}>About Us</button><br/><br/>
                <button className='btn btn-link' onClick={() => browserHistory.push('/contactUs')}>Contact Us</button><br/><br/>
                <button className='btn btn-link' onClick={() => browserHistory.push('/termsAndCondition')}>Terms And Conditions</button><br/><br/>
                <button className='btn btn-link' onClick={() => browserHistory.push('/privacyPolicy')}>Privacy Policy</button><br/><br/>
                <button className='btn btn-link' onClick={() => browserHistory.push('/timeslot')}>Add Timeslot</button><br/><br/>
                <button className='btn btn-link' onClick={() => browserHistory.push('/foodAndLectins')}>Food And Lectins</button><br/><br/>    
            </p>
            <section>

            </section>
        </section>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerNulbuttonfyError: () => dispatch(nulbuttonfyError()),
        triggerNulbuttonfySuccess: () => dispatch(nulbuttonfySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, users } = state;
    return { fetching, users };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting);