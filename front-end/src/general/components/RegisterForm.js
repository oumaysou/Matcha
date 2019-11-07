import React from 'react';
import InputForm from './InputForm';
import RadioForm from './RadioForm';
import SubmitForm from './SubmitForm';

export default class RegisterForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }

    handleInputChange = (name, value) => {
        this.props.onChange(name, value);
    }

    handleRadioChange = (name, value) => {
        this.props.onChange(name, value);
    }

    render() {
        return (
            <form className="form-register" onSubmit={this.handleSubmit}>
                <div className="form-inline">
                    <RadioForm
                        label="male"
                        name="gender"
                        text="Male"
                        onChange={this.handleInputChange}
                    />
                    <RadioForm
                        label="female"
                        name="gender"
                        text="Female"
                        onChange={this.handleInputChange}
                    />
                    <RadioForm
                        label="both"
                        name="gender"
                        text="Both"
                        onChange={this.handleInputChange}
                    />
                </div>

                <InputForm
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />

                <InputForm
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />

                <InputForm type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />

                <InputForm type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />

                <InputForm type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />

                <InputForm type="password"
                    name="passwordCfm"
                    placeholder="Confirm your password"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />

                <InputForm type="date"
                    name="birthday"
                    placeholder="Birth Date"
                    onChange={this.handleInputChange}
                    className="form-group inputForm"
                />

                <div className="form-inline">
                    <RadioForm
                        label="straight"
                        name="orientation"
                        text="Straight"
                        onChange={this.handleRadioChange}
                    />
                    <RadioForm
                        label="gay"
                        name="orientation"
                        text="Gay"
                        onChange={this.handleRadioChange}
                    />
                    <RadioForm
                        label="bisexual"
                        name="orientation"
                        text="Bisexual"
                        onChange={this.handleRadioChange}
                    />
                </div>

                <SubmitForm value="Register"
                    className="inputForm"
                />
            </form>
        );
    }
}
