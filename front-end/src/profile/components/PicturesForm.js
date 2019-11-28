import React from 'react';
import SubmitForm from '../../general/components/SubmitForm';
import { thunk_savePicturesUser, thunk_saveAvatarUser, thunk_delPictureUser } from '../../actions/thunk_actions_editProfile';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';

class PicturesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.userInfos.userData.username,
            avatar: this.props.userInfos.userData.avatar,
            photos: this.props.userInfos.photos,
            selectedFile: null,
            selectedAvatar: null,
            picClicked: this.props.picClicked || false
        }
    }

    delPicture = (e) => {
        let picture = e.target.id;      
        
        this.props.dispatch(thunk_delPictureUser(picture))
    }

    renderPictures() {
        const pictures = [...this.state.photos];
        // for (var index = pictures.length; index < 4; index++){
        //     pictures.push(process.env.PUBLIC_URL + '/img/default-profile_picture.jpg');
        // }
        if (pictures.lenth !== 0) {
            return pictures.map((picture, index) => {
                const picSrc = picture.split('/').pop();
                return <div key={index} className='text-center'>
                            <img src={process.env.PUBLIC_URL + '/img/' + picSrc} alt={'picture'+index} className="picture" />
                            <p id={picture} className="redCross" onClick={this.delPicture}>X</p>
                        </div>
            })
        }
        else
            return <div className='text-center'><p>No pictures aviable</p></div>;
    }

    handlePicturesSubmit = (e) => {
        e.preventDefault();
        if(this.state.selectedFile){
            const nbPictures = this.state.photos.length;
            if (nbPictures < 4){
                const ext = this.state.selectedFile.name.split('.').pop()
                const name = this.state.username + '.' + ext
                
                const formData = new FormData()
                formData.append(
                    'myImage',
                    this.state.selectedFile,
                    name
                    )
                
                this.props.dispatch(thunk_savePicturesUser(formData))
            }
            else{
                const message = "You have already too many pictures"
                NotificationManager.error(message, 'Sorry but...', 3000);
            }
        }
    }

    pictureChange = (e) => {
        e.preventDefault();
        this.setState({selectedFile: e.target.files[0]})
    }

    handleAvatarSubmit = (e) => {
        e.preventDefault();
        const ext = this.state.selectedAvatar.name.split('.').pop()
        const name = this.state.username + '.' + ext
        
        const avatarSrc = this.state.avatar.split('/').pop();
        const oldPath = { oldPath: "../front-end/public/img/" + avatarSrc };
        const userData = new FormData()
        userData.append(
            'myAvatar',
            this.state.selectedAvatar,
            name
            )        
        this.props.dispatch(thunk_saveAvatarUser(userData, oldPath));
    }

    avatarChange = (e) => {
        e.preventDefault();
      
        this.setState({selectedAvatar: e.target.files[0]})
    }


    render() {
        const avatarSrc = this.state.avatar.split('/').pop();    
        return (
            <div id='edit'>
                <div className="container">
                    <div className="row">

                        <h3 className='text-center'>Pictures</h3>

                        <form id="form-editAvatar" onSubmit={this.handleAvatarSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
                                    <div className="avatar">
                                        <p>Your Avatar</p>
                                        <img src={process.env.PUBLIC_URL + '/img/' + avatarSrc} alt="avatar" id="avatar" />
            
                                        <div>
                                            <input 
                                                type='file'
                                                accept='image/*'
                                                name='avatar'
                                                onChange={this.avatarChange}
                                            />
                                        </div>

                                        <SubmitForm
                                            value="Save Avatar"
                                            className="inputForm btn-edit"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <form id="form-editPhoto" onSubmit={this.handlePicturesSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
                                    <div className="pictureWrap">
                                        <p>Your Pictures</p>
                                        <div className="picList">
                                            {this.renderPictures()}
                                        </div>
                                    </div>

                                    <div>
                                    <input 
                                        type='file'
                                        accept='image/*'
                                        name='picture'
                                        onChange={this.pictureChange}
                                    />                                    
                                    </div>

                                    <SubmitForm
                                        value="Save Picture"
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
        picClicked: state.picClicked
    };
};

export default connect(mapStateToProps)(PicturesForm);
