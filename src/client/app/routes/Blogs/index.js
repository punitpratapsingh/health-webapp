/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import Markdown from 'react-markdown';
import moment from 'moment';
import Image from '../../components/Image';
import LoadingOverlay from '../../components/LoadingOverlay';


import { toast, ToastContainer } from 'react-toastify';
import {
    navigationIndexer,
    APPLICATION_ROUTES,
    SERVER_IMAGE_URL,
} from '../../constants';

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

class Blogs extends Component {

    constructor(props) {
        super(props);
        this.file = {};
        this.blogDetail = this.blogDetail.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChanges = this.handleChanges.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
        this.comment = this.comment.bind(this)
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
    addBlog() {
        window.location = '/addBlog';
    }
    blogDetail() {
        window.location = '/blogDetail';
    }
    handleChanges(c) {
        // this.setState({ mdeValue: c });
    }
    comment(){
        window.location = '/comment';
    }

    handleChange(value) {
        // this.setState(prev => ({ mdValue: value }));
        this.content.value = value;

    };
    fileSelectedHandler(e) {
        this.file[e.target.id] = e.target.files[0];
    }

    render() {
        const {
            fetching,
            blogs: {
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
            triggerToggleEditingBlog,
            triggerGenericUpdateBlog,
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
            <h2>Blogs</h2>
            <button className='btn btn-success btn-sm' onClick={this.addBlog}>+ Add Blog</button>
            <br />
            <section className='container'>
                {
                    data ?
                        data.map((blog, index) => {
                            return blog && blog.userDetails && <section className='blog-container' key={`blog-${limit * (page - 1) + (index + 1)}`}>
                                <section className='user-details'>
                                    <Image className='user-picture' width={60} height={60} image={blog && blog.userDetails && blog.userDetails.picture ? `${SERVER_IMAGE_URL}average/${blog.userDetails.picture}` : undefined} />
                                    <br />
                                    <p className='user-name'>
                                        {blog.userDetails.firstName} On {moment(blog.CreatedOn).format('DD MMM YYYY')}
                                    </p>
                                </section>
                                <section className='blog'>
                                    <section className='col blog' >
                                        {/* <section className='row data'>{limit * (page - 1) + (index + 1)}.</section> */}
                                        <section className='data text-center'>
                                            <section><img className='blog-image' src={blog && blog.picture ? `${SERVER_IMAGE_URL}average/${blog.picture}` : undefined} /></section>
                                            {
                                                editing === blog._id && 
                                                <p className='text-center'>
                                                    <input
                                                        type='file'
                                                        id='image'
                                                        accept='image/*'
                                                        onChange={this.fileSelectedHandler}
                                                    />
                                                </p>
                                            }
                                        </section>
                                        <section className='row data fon' >
                                            {
                                                editing === blog._id ?
                                                    <textarea
                                                        type='textarea'
                                                        className='custom-input'
                                                        ref={title => this.title = title}
                                                        defaultValue={blog.title}
                                                    /> :
                                                    <h1>{blog.title}</h1> || '-'
                                            }
                                        </section>
                                        <section className='row data'>
                                            {
                                                editing === blog._id ?

                                                    <SimpleMDE
                                                        id="your-custom-id"
                                                        onChange={this.handleChange}
                                                        ref={content => this.content = content}
                                                        // value={this.value}
                                                        options={{
                                                            autofocus: true,
                                                            spellChecker: false,
                                                            initialValue: blog.content,
                                                        }}
                                                    /> :
                                                    blog.content ? <Markdown source={blog.content} /> : '-'
                                            }
                                        </section>
                                    </section>
                                    {/* <section className='row data font' >{
                                            blog.comments.map(c => (<p> {c.comment} :{c._id}</p>))
                                        }</section> */}
                                    <section className='row data'>
                                        {
                                            !(editing === blog._id) &&
                                            <p>
                                                <button onClick={() => triggerGenericDeleteEntity(blog._id, page, limit)} className={'btn btn-sm app-btn btn-danger'}>
                                                    Delete
														</button>&nbsp;
														<button onClick={() => triggerToggleEditingBlog(blog._id, true)} className={'btn btn-sm btn-info'}>
                                                    Edit
														</button>&nbsp;
                                                        <button onClick={this.comment} className='btn btn-sm btn-success'> 
                                                            Comments and reply
                                                        </button>
                                            </p>
                                        }
                                        {
                                            editing === blog._id &&
                                            <p>
                                                <button
                                                    className='btn btn-sm btn-success'
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // console.log(this.file);
                                                        triggerGenericUpdateBlog(blog._id, this.title.value, this.content.value, this.file);
                                                    }}>
                                                    Save
													</button> &nbsp;
													<button
                                                    className='btn btn-sm btn-warning'
                                                    onClick={() => triggerToggleEditingBlog(undefined)}>
                                                    Cancel
													</button>
                                            </p>
                                        }
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
        triggerGenericDeleteEntity: (id, page, limit) => dispatch(genericDeleteEntity({
            payload: { postId: id },
            page,
            limit,
            endpoint: APPLICATION_ROUTES.BLOG_DELETE,
            listingEndpoint: APPLICATION_ROUTES.BLOGS_LIST,
        })),
        triggerGenericUpdateBlog: (postId, title, content, picture) => dispatch(genericCreateEntity({
            payload: { postId, title, content },
            multipart: true,
            multipleImages: true,
            picture,
            endpoint: APPLICATION_ROUTES.BLOG_UPDATE,
            listingEndpoint: APPLICATION_ROUTES.BLOGS_LIST,
            customDispatchers: [() => genericToggle({ toggleId: undefined })],
        })),
        triggerToggleEditingBlog: id => dispatch(genericToggle({ toggleId: id })),
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
)(Blogs);



