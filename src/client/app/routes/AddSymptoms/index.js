/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import LoadingOverlay from '../../components/LoadingOverlay';
import SimpleMDE from 'react-simplemde-editor';
import { browserHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import {
    navigationIndexer,
    SERVER_BASE_URL,
    APPLICATION_ROUTES,
    SERVER_IMAGE_URL,
} from '../../constants';

import {
    switchNavigation,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class AddSymptoms extends Component {

    constructor(props) {
        super(props);
        this.files = {};
        this.payload = {};
        this.handleChange = this.handleChange.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.clear = this.clear.bind(this);

        const { search } = location;
        const params = new URLSearchParams(search);
        if (params.get('code')) {
            this.decode = JSON.parse(atob(params.get('code')));
        }
        console.log(this.decode);

    }

    componentWillMount() {
        const { triggerSwitchNavigation } = this.props;
        triggerSwitchNavigation(navigationIndexer.addSymptoms);
    }
    componentDidUpdate() {
        document.title = `${this.decode ? 'Update': 'Add'} Disease`;
    }

    componentDidMount() {
        document.title = `${this.decode ? 'Update': 'Add'} Disease`;
    }
    fileSelectedHandler(e) {
        this.files[e.target.id] = e.target.files[0];
    }

    clear(e) {
        this.name.value = '';
        this.recommendations.value = '';
        this.overview.value = '';
        this.potential.value = '';

    }

    /**
     * 
     * @param {*} e 
     */
    handleChange(value) {
        this.payload[e.target.id] = e.target.value;
        console.log(this.payload);
    }

    render() {
        const {
            fetching,
            symptoms: {
                error,
                success,
            },
            triggerCreateEntity,
            triggerUpdateEntity,
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
            <h2>{`${this.decode ? 'Update': 'Add'} Disease`}</h2>
            <section className='box'>
                <Row className="space">
                    <Col sm="3">Disease Name</Col>
                    <Col sm="4">
                        <input
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="Disease name"
                            id="exampleText"
                            value={this.decode && this.decode.name}
                            ref={name => this.name = name} />
                    </Col>
                </Row>
                <Row className="space">
                    <Col sm="3">Images</Col>
                    <Col xs="4">
                        {
                            this.decode && 
                                <img height={60} src={this.decode.picture && `${SERVER_IMAGE_URL}average/${this.decode.picture}`} />
                        }
                        <input id='image' type="file" accept="image/*" onChange={this.fileSelectedHandler} />Picture<br/>
                        {
                            this.decode && 
                                <img height={60} src={this.decode.coverPicture && `${SERVER_IMAGE_URL}average/${this.decode.coverPicture}`} />
                        }
                        <input id='coverImage' type="file" accept="image/*" onChange={this.fileSelectedHandler} />Cover Picture
                </Col>
                </Row>


                <Row className="space">
                    <Col sm="3">Overview</Col>
                    <Col sm="9">
                        <SimpleMDE
                            id="overview"
                            onChange={change => this.overview = change}
                            // value={this.value}
                            options={{
                                placeholder: 'Give an overview about the disease',
                                autofocus: false,
                                spellChecker: false,
                                initialValue: this.decode ? this.decode.overview : '',
                            }}
                        />
                    </Col>
                </Row>
                <Row className="space">
                    <Col sm="3">Potential Deaseae</Col>
                    <Col sm="9">
                        <SimpleMDE
                            id="potential"
                            onChange={change => this.potential = change.split(',')}
                            // value={this.value}
                            options={{
                                placeholder: 'Separate potential diseases by comma',
                                autofocus: false,
                                spellChecker: false,
                                initialValue: this.decode ? this.decode.potentialDiseases.join(',\n\n') : '',
                            }}
                        />
                    </Col>
                </Row>
                <Row className="space">
                    <Col sm="3">Recommendations</Col>
                    <Col sm="9">
                        <SimpleMDE
                            id="recommendations"
                            onChange={change => this.recommendations = change}
                            // value={this.value}
                            options={{
                                placeholder: 'Give few recommendations for the disease',
                                autofocus: false,
                                spellChecker: false,
                                initialValue: this.decode ? this.decode.recommendation : '',
                            }}
                        />
                    </Col>
                </Row>
                <Row className='space'>
                    <Col className='row' >
                        <p className='space'>
                            <button
                                className='btn btn-sm btn-success '
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.decode ? 
                                        triggerUpdateEntity(this.decode._id, this.name.value, this.overview, this.potential, this.recommendations, this.files)
                                     : triggerCreateEntity(this.name.value, this.overview, this.potential, this.recommendations, this.files)
                                }}>
                                Save
                            </button>&nbsp;
                            <button
                                className='btn btn-sm btn-secondary  '
                                onClick={this.decode ? () => browserHistory.goBack() : this.clear}>
                                {this.decode ? 'Back' : 'Clear' }
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
        triggerCreateEntity: (name, overview, potentialDiseases, recommendation, picture) => dispatch(genericCreateEntity({
            payload: {
                name,
                overview,
                recommendation,
                potentialDiseases,
            },
            multipleImages: true,
            multipart: true,
            picture,
            endpoint: APPLICATION_ROUTES.ADD_SYMPTOMS,
        })),
        triggerUpdateEntity: (symptomId, name, overview, potentialDiseases, recommendation, picture) => dispatch(genericCreateEntity({
            payload: {
                symptomId,
                name,
                overview,
                recommendation,
                potentialDiseases,
            },
            multipleImages: true,
            multipart: true,
            picture,
            endpoint: APPLICATION_ROUTES.UPDATE_SYMPTOMS,
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
)(AddSymptoms);