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
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class BlogDetail extends Component {

    constructor(props) {
        super(props);
        this.blogDetail = this.blogDetail.bind(this)
    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.blogs);
        triggerFetchEntity();
    }

    componentDidUpdate() {
        document.title = 'Blogs';
    }

    componentDidMount() {
        document.title = 'Blogs';
    }
    addBlog(){
        window.location = '/addBlog';
    }
    blogDetail() {
        window.location = '/users';
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
            triggerFetchEntity,
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
            <button className='right' onClick={this.addBlog}>Add Blog</button>
            </section>
            <br />
            <section className='container'>
                {
                    data ?
                        data.slice(0,1).map((blog, index) => {
                            return blog && blog && <section key={`blog-${limit * (page - 1) + (index + 1)}`}>
                                 <section onClick={this.blogDetail}>
                                <section className='col  order' >
                                    <section className='row data'>{limit * (page - 1) + (index + 1)}.</section>
                                    <section className='row data fon'>{blog.title}</section>
                                    <section className='row data'><Image image={blog && blog.imageOne ? `${SERVER_IMAGE_URL}average/${blog.imageOne}` : undefined} />
                                    </section>
                                    <section className='row data'>{blog.content} </section>
                                    <section className='row data'>{moment(blog.CreatedOn).format('DD MMM YYYY')}</section>
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
            endpoint: APPLICATION_ROUTES.BLOGS_LIST,
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
)(BlogDetail);