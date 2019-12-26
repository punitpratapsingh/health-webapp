/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import Image from '../../components/Image';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import {
    navigationIndexer,
    APPLICATION_ROUTES,
    SERVER_SOCKET_URL,
    SERVER_ADMIN_USER,
} from '../../constants';

import {
    switchNavigation,
    fetchEntity,
    genericToggle,
    nullifyError,
    genericUpdateValue,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Messages extends Component {

    constructor(props) {
        super(props);
        // pass in the userid here that we want to login
        // pass in static id for now whichwill map to a common
        // admin user in the backend on whose behalf the messages will be posted.
        this.socket = io(`${SERVER_SOCKET_URL}?userId=${SERVER_ADMIN_USER}`, { forceNew: true });
        // this.io = this.socket.connect();
        this.sendMessage = this.sendMessage.bind(this);
        this.establishSocketConnectionWithUser = this.establishSocketConnectionWithUser.bind(this);
        // console.log(this.socket.connected);
        // this.socket.on('connect', () => {
        //     console.log('connected');
        // })
        // // this.socket.on('connection', () => {
        // //     console.log('connected');
        // // })
        // this.socket.on('event', payload => {
        //     console.log('payload received')
        //     console.log(payload);
        // })
    }


    /**
     * establish a socket connection with user
     * @param {*} user 
     */
    establishSocketConnectionWithUser(user) {
        if (!user) {
            return toast.error('Require user details for connection');
        }
        if (!this.socket.connected) {
            toast.error('Socket is not connected');
        } else {
            this.socket.emit('connectUser', user);
            this.socket.on('userConnected', payload => {
                console.log(`connected with the ${payload} channel.`);
            });
        }
    }

    /**
     * send message
     */
    sendMessage(message) {
        if (message) {
            if (!this.socket.connected) {
                toast.error('Socket is not connected');
            } else {
                this.socket.emit('message', message);
            }
        }
    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.messages);
        triggerFetchEntity();

    }

    componentDidUpdate() {
        document.title = 'Message';
    }

    componentDidMount() {
        const self = this;
        console.log('did mount');
        document.title = 'Message';
        this.socket.on('connect', () => {
            console.log('connected');
           this.socket.on('message', (data) => {
            const { props: { messages: { conversations }, triggerGenericUpdateValue } } = self;
                console.log(conversations);
               conversations.push(data.data);
               triggerGenericUpdateValue('conversations', conversations);
               const messageList = document.getElementById('message-list');
                messageList.scrollTop = messageList.scrollHeight;
           });
        });
    }

    messageReply(messagePayload) {
        const payload = messagePayload;
        const code = (JSON.stringify(payload));
        browserHistory.push(`/messageReply?code=${code}`);
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
                conversations,
            },
            triggerFetchEntity,
            triggerActiveConversation,
            triggerFetchConversations,
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
            <section className='container-fluid'>
                <ToastContainer />
                <h2>Messages</h2>
                <section className='row message-interface'>
                    <section className='col-md-3'>
                        <section className='chat-list'>
                            {
                                data ?
                                    data.map((message, index) => {
                                        return message && message && <section
                                            // onClick={() => this.messageReply(message)}
                                            onClick={() => {
                                                triggerActiveConversation(message._id);
                                                this.establishSocketConnectionWithUser(message._id);
                                                triggerFetchConversations(1, 1000, { userId: message._id })
                                            }
                                            }
                                            className='row'
                                            key={`message-${message._id}`}>
                                            <section className='ind-message'>
                                                <Image image={undefined} />
                                                <span className={message.online ? 'online-button' : 'offline-button'}></span>
                                                <span className='user-details'>
                                                    <span>{message.firstName} &nbsp; {message.lastName}</span><br />
                                                    <span className='email'>{message.email}</span>
                                                </span>
                                                <p className='message-snippet'>{message.message.message}</p>
                                                <p className='pull-right moments-ago'>{moment(message.message.createdOn).fromNow()}</p>
                                            </section>
                                        </section>
                                    }
                                    ) :
                                    <section>
                                        <section colSpan="7">No Messages</section>
                                    </section>
                            }
                        </section>
                    </section>
                    <section className='col-md-9 container-messages'>
                        <section className='messages-list' id='message-list'>
                            {/* <p className='flex-container'>Active Conversation</p> */}
                            {
                                conversations ?
                                    conversations.map(conversation => {
                                        return <p>
                                            {
                                                conversation.userId === SERVER_ADMIN_USER ?
                                                    <p className='message'>
                                                        {/* <section className='self-sender'>
                                                            <span>You</span>
                                                        </section> */}
                                                        <section className='self-message'>
                                                            {conversation.message}
                                                            <br />
                                                            <span className='time'>
                                                                {moment(conversation.timeStamp).fromNow()}
                                                            </span>
                                                        </section>
                                                    </p>
                                                    : <p className='message'>
                                                        <section className='other-sender'>
                                                            <span>{conversation.name}</span>
                                                        </section>
                                                        <section className='other-message'>
                                                            {conversation.message}
                                                            <br />
                                                            <span className='time'>
                                                                {moment(conversation.timeStamp).fromNow()}
                                                            </span>
                                                        </section>
                                                    </p>
                                            }
                                        </p>
                                    })
                                    : <p className='text-center' style={{ padding: '20px' }}>
                                        <FontAwesome name='commenting' size='2x' /><br />
                                        The conversation you select will appear here.
                                </p>
                            }
                        </section>
                        <div className="chat-message">
                            <textarea ref={message => this.message = message} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                            <button onClick={() => {
                                this.sendMessage(this.message.value);
                                this.message.value = '';
                            }} className='btn btn-default btn-sm'><FontAwesome name='paper-plane' /></button>
                        </div>
                    </section>
                </section>
            </section>
        </section >
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerFetchEntity: (page, limit, payload) => dispatch(fetchEntity({
            payload,
            page,
            limit,
            endpoint: APPLICATION_ROUTES.STAFF_MESSAGE_LIST,
        })),
        triggerFetchConversations: (page, limit, payload) => dispatch(fetchEntity({
            page,
            limit,
            endpoint: APPLICATION_ROUTES.LIST_CONVERSATIONS,
            payload,
            customDispatchers: [() => {
                const messageList = document.getElementById('message-list');
                messageList.scrollTop = messageList.scrollHeight;
            }]
        })),
        triggerActiveConversation: (id) => dispatch(genericToggle({ toggleId: id })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
        triggerGenericUpdateValue: ({ property, value }) => dispatch(genericUpdateValue({ property, value })),
    };
}

const mapStateToProps = state => {
    const { fetching, messages } = state;
    return { fetching, messages };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);

