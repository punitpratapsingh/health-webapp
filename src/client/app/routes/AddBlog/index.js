/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SimpleMDE from 'react-simplemde-editor';
import FontAwesome from 'react-fontawesome';
import { Row, Col, Card, Input, button } from 'reactstrap';
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
    fetchEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class AddBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mdeValue: 'hello'
        }
        this.files = {};
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.clear = this.clear.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.addSymptoms);
        triggerFetchEntity();
    }
    componentDidUpdate() {
        document.title = 'Add Blog';
    }

    componentDidMount() {
        document.title = 'Add Blog';
    }
    fileSelectedHandler(e) {
        this.files[e.target.id] = e.target.files[0];
    }
    handleChange(value) {
        this.setState({ mdeValue: value });
    };

    clear(e) {
        this.title.value = '';
        this.description.value = '';

    }

    render() {
        const {
            fetching,
            blogs: {
                data,
                page,
                limit,
                length,
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
            <h2>Add Blog</h2>
            <section className='box'>
                <Row className="space">
                    <Col sm="3">Title</Col>
                    <Col sm="4">
                        <input
                            className='form-control'
                            type="text"
                            name="text"
                            placeholder="Title of blog"
                            id="exampleText"
                            ref={title => this.title = title} />
                    </Col>
                </Row>
                <Row className="space">
                    <Col sm="3">Images</Col>
                    <Col xs="4"><input id='image' type="file" accept="image/*" onChange={this.fileSelectedHandler} />Image

                </Col>
                </Row>

                <Row className="space">
                    <Col sm="3">Description</Col>
                    <Col sm="9">
                        <SimpleMDE
                            id="your-custom-id"
                            label="Edit Blog"
                            onChange={this.handleChange}
                            // value={this.value}
                            options={{
                                autofocus: true,
                                spellChecker: false,
                                initialValue: '',
                            }}
                        />
                    </Col>
                </Row>

                <Row className="space">
                    <Col sm="3">User</Col>
                    <Col sm="4">

                        <select ref={data => this.data = data}>
                            {
                                data && data.map((user, index) =>
                                    <option
                                        key={`${index}_${user.id}`}
                                        value={user._id}>
                                        {user.firstName}{user.lastName}
                                    </option>)
                            }
                        </select>
                    </Col>
                </Row>

                <Row className='space'>
                    <Col className='row' >
                        <p className='space'>
                            <button
                                className='btn btn-sm btn-success '
                                onClick={(e) => {
                                    e.preventDefault();
                                    triggerCreateEntity(this.title.value, this.state.mdeValue, this.data.value, this.files)
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
        triggerCreateEntity: (title, content, userId, picture, admin) => dispatch(genericCreateEntity({
            payload: {
                title,
                content,
                userId,
                type: 'admin',
            },
            multipleImages: true,
            multipart: true,
            picture,
            endpoint: APPLICATION_ROUTES.BLOGS_ADD,
        })),
        triggerFetchEntity: (page, limit, payload) => dispatch(fetchEntity({
            payload: { admin: true, role: 2 },
            page,
            limit,
            endpoint: APPLICATION_ROUTES.USERS_LIST,
        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, blogs } = state;
    return { fetching, blogs };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBlog);