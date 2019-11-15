import React from 'react';
import InputImageForm from '../../general/components/InputImageForm';
import InputForm from '../../general/components/InputForm';
import RadioForm from '../../general/components/RadioForm';
import SubmitForm from '../../general/components/SubmitForm';
import { thunk_editInfosUser } from '../../actions/thunk_actions_editProfile';
import { connect } from 'react-redux';
import moment from 'moment';
import TagCompo from './Tag';


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
            tags: this.props.userInfos.tags || []
        }
    }

    handleAddTag = (e) => {
        const array = [...this.state.tags];
        const tag = e.target.id;
        if (!array.includes(tag)){
            array.push(tag);
            this.setState({tags:array});
        }   
    }

    handleRemTag = (e) => {
        const array = [...this.state.tags];
        const index = array.indexOf(e.target.id);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({tags: array});
        }    
    }
    
    renderAllTags() {
        const allTags = this.props.allTags.data;

        if (allTags.lenth !== 0) {
            return allTags.map((allTag, index) => {
                return <TagCompo key={index} tag={allTag.tagName} func={this.handleAddTag}/>;
            })
        }
        else
            return <div className='text-center'><p>No tags aviable</p></div>;
    }

    renderUserTags() {
        const userTags = this.state.tags;
       
        if (userTags.lenth !== 0) {
            return userTags.map((userTag, index) => {
                return <TagCompo key={index} tag={userTag} func={this.handleRemTag}/>;
            })
        }
        else
            return <div className='text-center'><p>Please select a tag</p></div>;
    }

    handleInfosSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.dispatch(thunk_editInfosUser(user));
    }

    handlePicturesSubmit = (e) => {
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
                                    
                                    <div>
                                        <p>All Tags</p>
                                        {this.renderAllTags()}
                                    </div>
                                    <div>
                                        <p>Your Tags</p>
                                        {this.renderUserTags()}
                                    </div>

                                    <SubmitForm
                                        value="Change identity"
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
        userInfos: state.userInfos || {},
        allTags: state.allTags || {}
    };
};

export default connect(mapStateToProps)(EditForm);
