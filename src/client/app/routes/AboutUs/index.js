/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import LoadingOverlay from '../../components/LoadingOverlay';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericCreateEntity,
    genericDeleteEntity,
    genericToggle,
    fetchEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Aboutus extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(value) {
        this.content = value;
    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.users);
        triggerFetchEntity();
    }
    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'About Us';
        triggerSwitchNavigation(navigationIndexer.aboutUs);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'About Us';
        triggerSwitchNavigation(navigationIndexer.aboutUs);
    }


    render() {
        const {
            fetching,
            stati: {
                editing,
                data,
                page,
                limit,
                length,
                error,
                success,
            },
            triggerFetchEntity,
            triggerCreateEntity,
            triggerGenericDeleteEntity,
            triggerGenericUpdateAbout,
            triggerToggleEditingAbout,
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

        const { aboutUs, _id } = data ? data[0] : {};

        return <section>
            {LoadingOverlay({ show: fetching })}
            <ToastContainer />
            <h2>About Us</h2>
            <section className='container'>
                {
                    aboutUs ?
                        <section>
                            <SimpleMDE
                                id="your-custom-id"
                                onChange={this.handleChange}
                                options={{
                                    autofocus: true,
                                    spellChecker: false,
                                    initialValue: aboutUs,
                                }}
                            />
                            <button
                                className='btn btn-sm btn-success'
                                onClick={(e) => {
                                    e.preventDefault();
                                    triggerGenericUpdateAbout(_id, this.content);
                                }}>
                                Save
                            </button>
                        </section> : ''
                }
            </section>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerFetchEntity: (page, limit, payload) => dispatch(fetchEntity({
            payload,
            page,
            limit,
            endpoint: APPLICATION_ROUTES.LIST_STATIC,
        })),
        triggerCreateEntity: (aboutUs) => dispatch(genericCreateEntity({
            payload: { aboutUs },
            endpoint: APPLICATION_ROUTES.ADD_STATIC,
            listingEndpoint: APPLICATION_ROUTES.LIST_STATIC,
        })),
        triggerGenericDeleteEntity: (id, page, limit) => dispatch(genericDeleteEntity({
            payload: { staticId: id },
            page,
            limit,
            endpoint: APPLICATION_ROUTES.DELETE_STATIC,
            listingEndpoint: APPLICATION_ROUTES.LIST_STATIC,
        })),

        triggerGenericUpdateAbout: (id, aboutUs) => dispatch(genericCreateEntity({
            payload: { staticId: id, aboutUs },
            endpoint: APPLICATION_ROUTES.UPDATE_STATIC,
            listingEndpoint: APPLICATION_ROUTES.LIST_STATIC,
        })),
        triggerToggleEditingAbout: (id) => dispatch(genericToggle({ toggleId: id })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, stati } = state;
    return { fetching, stati };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Aboutus);
