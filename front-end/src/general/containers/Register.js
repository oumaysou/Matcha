import React from 'react';
import RegisterForm from '../components/RegisterForm';
import IndexLayout from '../components/IndexLayout';
// import { NotificationManager } from 'react-notifications';
import { thunk_register } from '../../actions/thunk_actions';
import { connect } from 'react-redux';

// const API_KEY = 'AIzaSyDfMEOIYCjr5sC1IBCg6RNc5E7Jg1Iw9yM'; 

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            birthday: '',
            password: '',
            passwordCfm: '',
            gender: '',
            orientation: '',
            location: '',
        };
    }

    createUser = () => {
        this.props.dispatch(thunk_register(this.state));
    }

    saveState = (name, value) => {
        this.setState({ [name]: value });
    }

    render() {
        // console.log(JSON.stringify(this.props, null, 4));
        return (
            <IndexLayout>
                <RegisterForm
                    onSubmit={this.createUser}
                    onChange={this.saveState}
                />
            </IndexLayout>
        );
    }

}

const mapStateToProps = state => {
    return {
        data: state
    };
};

export default connect(mapStateToProps)(Register);
