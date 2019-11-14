import React from 'react';
import InputImageForm from '../../general/components/InputImageForm';
import InputForm from '../../general/components/InputForm';
import RadioForm from '../../general/components/RadioForm';
import SubmitForm from '../../general/components/SubmitForm';
import { thunk_editInfosUser } from '../../actions/thunk_actions_editProfile';
import { connect } from 'react-redux';
import moment from 'moment';

class EditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oldusername: this.props.userInfos.userData.username,
            username: this.props.userInfos.userData.username,
            firstName: this.props.userInfos.userData.firstName,
            lastName: this.props.userInfos.userData.lastName,
            password: '',
            passwordCfm: '',
            gender: this.props.userInfos.userData.gender,
            orientation: this.props.userInfos.userData.orientation,
            location: this.props.userInfos.userData.location,
            birthday: moment(this.props.userInfos.userData.birthday).format('L'),
            avatar: this.props.userInfos.userData.avatar,
            bio: this.props.userInfos.userData.bio || '',
            photos: [],
            tags: []
        }
    }

    handleInfosSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        console.log(user);
        
        this.props.dispatch(thunk_editInfosUser(user));
    }

    handleAvatarSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.dispatch(thunk_editInfosUser(user));
    }

    handleTagsSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.dispatch(thunk_editInfosUser(user));
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleRawChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.handleInputChange(name, value);
    }

      handleRadioChange = (name, value) => {
        this.setState({ [name]: value });
    }

    render() {
        console.log(this.state.birthday);
        
        return (
            <div id='edit'>
                <div className="container">
                    <div className="row">
                        <h3 className='text-center'>Avatar</h3>
                        <form id="form-editPhoto" onSubmit={this.handleAvatarSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
                                    <div className="userpic">
                                        <img src={this.state.avatar} alt="avatar" id="avatar" />
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
                        <form className="form-editIdentity" onSubmit={this.handleInfosSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
                                    <div className="form-inline mb5">
                                        <RadioForm
                                          label="male"
                                          name="gender"
                                          text="Male"
                                          checked= {this.state.gender === "male"}
                                          onChange={this.handleInputChange}
                                        />
                                        <RadioForm
                                          label="female"
                                          name="gender"
                                          text="Female"
                                          checked={this.state.gender === "female"}
                                          onChange={this.handleInputChange}
                                        />
                                        <RadioForm
                                          label="both"
                                          name="gender"
                                          text="Both"
                                          checked={this.state.gender === "both"}
                                          onChange={this.handleInputChange}
                                        />
                                    </div>

                                    <label>First Name</label>
                                    <InputForm
                                        type="text"
                                        name="firstName"
                                        value={this.state.firstName || ''}
                                        placeholder="First name"
                                        onChange={this.handleInputChange}
                                        className="inputForm mb5"
                                    />

                                    <label>Last Name</label>
                                    <InputForm
                                        type="text"
                                        name="lastName"
                                        value={this.state.lastName || ''}
                                        placeholder="Last name"
                                        onChange={this.handleInputChange}
                                        className="inputForm mb5"
                                    />

                                    <label>Password</label>
                                    <InputForm
                                        type="password"
                                        name="password"
                                        placeholder="new password"
                                        onChange={this.handleInputChange}
                                        className="inputForm"
                                    />
                                    <InputForm
                                        type="password"
                                        name="passwordCfm"
                                        placeholder="Confirm password"
                                        onChange={this.handleInputChange}
                                        className="inputForm mb5"
                                    />

                                    <label>Birthday</label>
                                    <p>{this.state.birthday}</p>
                                    <input type="date"
                                        name="birthday"
                                        placeholder="Birth Date"
                                        onChange={this.handleRawChange}
                                        className="inputForm mb5"
                                    />

                                    <div className="form-inline mb5">
                                        <RadioForm
                                            label="straight"
                                            name="orientation"
                                            text="Straight"
                                            checked={this.state.orientation === "straight"}
                                            onChange={this.handleInputChange}
                                        />
                                        <RadioForm
                                            label="gay"
                                            name="orientation"
                                            text="Gay"
                                            checked={this.state.orientation === "gay"}
                                            onChange={this.handleInputChange}
                                        />
                                        <RadioForm
                                            label="bisexual"
                                            name="orientation"
                                            text="Bisexual"
                                            checked={this.state.orientation === "bisexual"}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    
                                    <label className="block">Biographie</label>
                                    <textarea
                                        rows="5"
                                        cols="40"
                                        name="bio"
                                        value={this.state.bio}
                                        placeholder="Bio"
                                        onChange={this.handleRawChange}
                                    />

                                    <SubmitForm
                                        value="Change identity"
                                        className="inputForm btn-edit"
                                    />
                                </div>
                            </div>
                        </form>


                        <h3 className='text-center'>Tags</h3>
                        <form className="form-editInfos" onSubmit={this.handleTagsSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">

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
                        </form>


                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.userInfos || {}
    };
};

export default connect(mapStateToProps)(EditForm);
