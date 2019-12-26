/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Image from '../../components/Image';

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

class MessagesReply extends Component {

    constructor(props) {
        super(props);

        const { search } = location;
        const params = new URLSearchParams(search);
        if (params.get('code')) {
            this.decode = JSON.parse(atob(params.get('code')));
        }
        console.log(this.decode);
    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.messages);
        triggerFetchEntity(1, 30, { userId: this.decode._id });
    }

    componentDidUpdate() {
        document.title = 'Message';
    }

    componentDidMount() {
        document.title = 'Message';
    }

    messageReply() {
        window.location = '/messageReply';
    }
    render() {
        const {
            fetching,
            messages: {
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
                <button className='right' onClick={this.addmessage}>Message Reply</button>
            </section>
            <br />
            <section className='container'>
                {
                    data ?
                        data.map((message, index) => {
                            return message && message && <section key={`message-${limit * (page - 1) + (index + 1)}`}>
                                <section>
                                    <section className='col  order' >
                                        <section className='row data fon'>{message.name}</section>
                                        <section className='row data'><Image image={message && message.imageOne ? `${SERVER_IMAGE_URL}average/${message.imageOne}` : undefined} />
                                        </section>
                                        <section className='row data'>{message.content} </section>
                                        <section className='row data'>{moment(message.CreatedOn).format('DD MMM YYYY')}</section>
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
            endpoint: APPLICATION_ROUTES.LIST_CONVERSATIONS,
        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, messages } = state;
    return { fetching, messages };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesReply);