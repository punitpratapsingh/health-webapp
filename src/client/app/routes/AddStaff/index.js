/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Row, Col, Card, Input, button, ButtonGroup, Button, radio } from 'reactstrap';
import LoadingOverlay from '../../components/LoadingOverlay';

import { toast, ToastContainer } from 'react-toastify';
import {
    navigationIndexer,
    SERVER_BASE_URL,
    APPLICATION_ROUTES,
} from '../../constants';

import {
    switchNavigation,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class AddStaff extends Component {

    constructor(props) {
        super(props);
        this.files = {};
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.clear = this.clear.bind(this);
        this.state = { checkbox : [] };

    }

    checkbox(i) {
        const index = this.state.checkbox.indexOf(i);
        if (index === -1) {
            this.state.checkbox.push(i);
        } else {
            this.state.checkbox.splice(index, 1);
        }
        this.setState({ checkbox: this.state.checkbox });
    }

    componentWillMount() {
        const { triggerSwitchNavigation } = this.props;
        triggerSwitchNavigation(navigationIndexer.addSymptoms);
    }
    componentDidUpdate() {
        document.title = 'Add Staff';
    }

    componentDidMount() {
        document.title = 'Add Staff';
    }
    fileSelectedHandler(e) {
        this.files[e.target.id] = e.target.files[0];
    }

    clear(e) {
        this.name.value = '';
        this.specialist.value = '';
        this.qualification.value = '';
        this.experience.value = '';
        this.description.value = '';
        this.email.value = '';
        this.passward.value = '';

    }

    render() {
        const {
            fetching,
            users: {
                error,
                success,
            },
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

        return <section >
            <ToastContainer />
            <LoadingOverlay show={fetching} />
            <h2>Add Staff</h2>
            <section className='box'>
                <Row className="spac">
                    <Col sm="3">Name</Col>
                    <Col sm="4">
                        <input
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="first name"
                            id="exampleText"
                            ref={name => this.firstName = name} />
                             <input
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="last name"
                            id="exampleText"
                            ref={name => this.lastName = name} />
                    </Col>
                </Row>
                <Row className="spac">
                    <Col sm="3">Images</Col>
                    <Col xs="4"><input id='image' type="file" accept="image/*" onChange={this.fileSelectedHandler} />Profile
    
                </Col>
                </Row>
                <Row className="spac">
                    <Col sm="3">Email</Col>
                    <Col sm="4">
                        <input
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="Email"
                            id="exampleText"
                            ref={email => this.email = email} />
                    </Col>
                </Row> <Row className="spac">
                    <Col sm="3">Password</Col>
                    <Col sm="4">
                        <input
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="Password"
                            id="exampleText"
                            ref={passward => this.passward = passward} />
                    </Col>
                </Row>
                <Row className="spac">
                    <Col sm="3">Access Level</Col>
                <Col sm="4">
                        <input type='checkbox' className='check' onClick={() => this.checkbox(1)} active={this.state.checkbox.indexOf(1) !== -1}/> Blogs<br></br>
                        <input type='checkbox' onClick={() => this.checkbox(2)} active={this.state.checkbox.indexOf(2) !== -1}/> Staff<br></br>
                        <input type='checkbox' onClick={() => this.checkbox(3)} active={this.state.checkbox.indexOf(3) !== -1}/> Gut Wellness<br></br>
                        <input type='checkbox' onClick={() => this.checkbox(4)} active={this.state.checkbox.indexOf(4) !== -1}/> Chatting<br></br>
                </Col>
                </Row>
                <Row className="spac">
                    <Col sm="3">Qualification</Col>
                    <Col sm="4">
                        <textarea
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="qualification"
                            id="exampleText"
                            ref={qualification => this.qualification = qualification} />
                    </Col>
                </Row>
                <Row className="spac">
                    <Col sm="3">Experience</Col>
                    <Col sm="4">
                        <textarea
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="experience"
                            id="exampleText"
                            ref={experience => this.experience = experience} />
                    </Col>
                </Row>
                <Row className="spac">
                    <Col sm="3">Specialist In</Col>
                    <Col sm="4">
                        <input
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="specialist"
                            id="exampleText"
                            ref={specialist => this.specialist = specialist} />
                    </Col>
                </Row>
                <Row className="spac">
                    <Col sm="3">Description</Col>
                    <Col sm="4">
                        <textarea
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="description"
                            id="exampleText"
                            ref={description => this.description = description} />
                    </Col>
                </Row>
                <Row className='spac'>
                    <Col className='row' >
                        <p className='spac'>
                            <button
                                className='btn btn-sm btn-success '
                                onClick={(e) => {
                                    e.preventDefault();
                                    triggerCreateEntity(this.firstName.value, this.lastName.value, this.email.value, this.passward.value, this.qualification.value, this.experience.value, this.specialist.value,this.description.value,this.state.checkbox, this.files && this.files.length && this.files[0])
                                }}

                            >
                                Save
                </button>
                            <button
                                className='btn btn-sm btn-secondary  '
                                onClick={this.clear}
                            >
                                Clear
                </button>
                        </p>
                    </Col>

                </Row>
            </section>
        </section>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerCreateEntity: (firstName, lastName, email, password, certification, experience, speciality,description, access, picture) => dispatch(genericCreateEntity({
            payload: {
                type: 2,
                firstName, lastName,
                email,
                password,
                certification,
                speciality,
                experience,
                description,
                access,
            },
             multipleImages: false,
             multipart: true,
             picture,
            endpoint: APPLICATION_ROUTES.ADD_STAFF,
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
)(AddStaff);