import React from 'react';
import SignInForm from '../components/SignInForm';
import IndexLayout from '../components/IndexLayout';
import { thunk_signIn } from '../../actions/thunk_actions';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Profile from '../../profile/containers/Profile';
import MatchaPrime from './../components/bg-landing.jpg';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            connected: false
        };
        // this.saveState = this.saveState.bind(this);
        // this.connectUser = this.connectUser.bind(this);
    }

    connectUser = () => {
        this.props.dispatch(thunk_signIn(this.state));

    }

    saveState = (name, value) => {
        this.setState({ [name]: value });
    }

    render() {
        if (this.props.connected) {
            return <Route component={Profile} />
        }
        else {

            return (
                <IndexLayout whichone={MatchaPrime}>
                    <SignInForm
                        onSubmit={this.connectUser}
                        onChange={this.saveState}
                    />
                </IndexLayout>
            );
        }
    }
}


const mapStateToProps = ({ connected, username }) => {
    return {
        connected,
        username
    };
};

export default connect(mapStateToProps)(SignIn);