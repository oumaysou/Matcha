import React from 'react';
import InputImageForm from '../../general/components/InputImageForm';
import InputForm from '../../general/components/InputForm';
import RadioForm from '../../general/components/RadioForm';
import SubmitForm from '../../general/components/SubmitForm';

export default class EditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordCfm: '',
            gender: '',
            orientation: '',
            location: '',
            birthday: '',
            avatar: '',
            bio: '',
            photos: [],
            tags: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }

    handleInputChange = (name, value) => {
      this.props.onChange(name, value);
    }

    //   handleRadioChange = (name, value) => {
    //   this.props.onChange(name, value);
    // }

    render() {
        const user = this.props.user;
        // console.log(user)
        // console.log(this.state)
        return (
            <div id='edit'>
                <div className="container">
                    <div className="row">
                        <h3 className='text-center'>Avatar</h3>
                        <form id="form-editPhoto" onSubmit={this.handleSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
                                    <div className="userpic">
                                        <img src={user.avatar} alt="avatar" id="avatar" />
                                    </div>

                                    <InputImageForm
                                        name="avatar"
                                        className="form-group inputForm"
                                        onChange={this.handleInputChange}
                                    />

                                    <SubmitForm
                                        value="Change avatar"
                                        className="inputForm btn-edit"
                                    />
                                </div>
                            </div>
                        </form>


                        <h3 className='text-center'>Identity</h3>
                        <form className="form-editIdentity" onSubmit={this.handleSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
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
                                        placeholder='Login'
                                        onChange={this.handleInputChange}
                                        className="form-group inputForm"
                                    />

                                    <InputForm
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        onChange={this.handleInputChange}
                                        className="form-group inputForm"
                                    />

                                    <InputForm
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        onChange={this.handleInputChange}
                                        className="form-group inputForm"
                                    />

                                    <InputForm
                                        type="password"
                                        name="password"
                                        placeholder="new password"
                                        onChange={this.handleInputChange}
                                        className="form-group inputForm"
                                    />
                                    <InputForm
                                        type="password"
                                        name="passwordCfm"
                                        placeholder="Confirm password"
                                        onChange={this.handleInputChange}
                                        className="form-group inputForm"
                                    />

                                    <InputForm type="date"
                                        name="birthday"
                                        placeholder="Birth Date"
                                        onChange={this.handleInputChange}
                                        className="form-group inputForm"
                                    />

                                    <SubmitForm
                                        value="Change identity"
                                        className="inputForm btn-edit"
                                    />
                                </div>
                            </div>
                        </form>


                        <h3 className='text-center'>Infos</h3>
                        <form className="form-editInfos" onSubmit={this.handleSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
                                    <div className="form-inline">
                                        <RadioForm
                                            label="straight"
                                            name="orientation"
                                            text="Straight"
                                            onChange={this.handleInputChange}
                                        />
                                        <RadioForm
                                            label="gay"
                                            name="orientation"
                                            text="Gay"
                                            onChange={this.handleInputChange}
                                        />
                                        <RadioForm
                                            label="bisexual"
                                            name="orientation"
                                            text="Bisexual"
                                            onChange={this.handleInputChange}
                                        />

                                        <InputForm
                                            type="text"
                                            name="bio"
                                            placeholder="Bio"
                                            onChange={this.handleInputChange}
                                            className="form-group inputForm"
                                        />

                                        <InputForm
                                            type="text"
                                            name="tags"
                                            placeholder="Tags"
                                            onChange={this.handleInputChange}
                                            className="form-group inputForm"
                                        />

                                        <SubmitForm
                                            value="Change infos"
                                            className="inputForm btn-edit"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        );
    }
}
