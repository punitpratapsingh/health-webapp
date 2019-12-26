/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Contactus extends Component {

    constructor(props) {
        super(props);

    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.Contactus);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.Contactus);
    }


    render() {
        const {
            fetching,
            dashboard: {
                success,
                error,
            },
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
            <h2>Contact Us</h2>
            <section className='box'>
                <section>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</section>
                {/* <section className='space'><button className='bg-success btn'>Edit</button> &nbsp;<button className='bg-danger btn'>Remove</button></section> */}

            </section>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerGenericCreateEntity: (text, page, limit) => dispatch(genericCreateEntity({
            payload: { text },
            page,
            limit,
            endpoint: APPLICATION_ROUTES.UPDATE_ABOUT,
        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, dashboard } = state;
    return { fetching, dashboard };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contactus);
