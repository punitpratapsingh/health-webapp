/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleMDE from 'react-simplemde-editor';
import { toast, ToastContainer } from 'react-toastify';
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

class PrivacyPolicy extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.content = value;
    }
    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.PrivacyPolicy);
        triggerFetchEntity();
    }
    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Privacy policy';
        triggerSwitchNavigation(navigationIndexer.PrivacyPolicy);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Privacy policy';
        triggerSwitchNavigation(navigationIndexer.PrivacyPolicy);
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

        const { privacyPolicy, _id } = data ? data[0] : {};

        return <section>
            <h2>Privacy Policy</h2>
            <ToastContainer />
            <section className='container'>
                {
                    privacyPolicy ?
                    <section>
                        <SimpleMDE
                            id="your-custom-id"
                            onChange={this.handleChange}
                            options={{
                                autofocus: true,
                                spellChecker: false,
                                initialValue: privacyPolicy,
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
        triggerCreateEntity: ( privacyPolicy ) => dispatch(genericCreateEntity({
			payload:{privacyPolicy},
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
		
		triggerGenericUpdateAbout: (id, privacyPolicy) => dispatch(genericCreateEntity({
			payload:{staticId: id, privacyPolicy},
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
)(PrivacyPolicy);
