import React from 'react';
import InputForm from './InputForm';
import SubmitForm from './SubmitForm';

export default class SignInForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }

    handleInputChange = (name, value) => {
      this.props.onChange(name, value);
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <InputForm
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />
                <InputForm
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />
                <a href="/forgotPassword">Forgot your password ?</a>
                <SubmitForm
                    value="Log in"
                    onChange={this.handleInputChange}
                    className="inputForm"
                />
            </form>
        );
    }
}
