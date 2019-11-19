import React from 'react';
import SubmitForm from '../../general/components/SubmitForm';
import { thunk_savePicturesUser } from '../../actions/thunk_actions_editProfile';
import { connect } from 'react-redux';

class PicturesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.userInfos.userData.username,
            avatar: this.props.userInfos.userData.avatar,
            photos: this.props.userInfos.photos,
            picture: ''
        }
    }

    renderPictures() {
        const pictures = [...this.state.photos];
        for (var index = pictures.length; index < 5; index++){
            pictures.push(this.state.avatar);
        }
        if (pictures.lenth !== 0) {
            return pictures.map((picture, index) => {
                return <div key={index} className='text-center'>
                            <img src={picture} alt={'picture'+index} className="picture" />
                            <p id={index} className="redCross" onClick={this.delPicture}>X</p>
                        </div>
            })
        }
        else
            return <div className='text-center'><p>No pictures aviable</p></div>;
    }

    handlePicturesSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.dispatch(thunk_savePicturesUser(user));
    }

    pictureChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }


    render() {    
        return (
            <div id='edit'>
                <div className="container">
                    <div className="row">
                        <h3 className='text-center'>Pictures</h3>
                        <form id="form-editPhoto" onSubmit={this.handlePicturesSubmit}>
                            <div className="col-md-12 text-center">
                                <div className="panel panel-default">
                                    <div className="avatar">
                                        <p>Your Avatar</p>
                                        <img src={this.state.photos[0] || this.state.avatar} alt="avatar" id="avatar" />
                                    </div>

                                    <div className="pictureWrap">
                                        <p>Your Pictures</p>
                                        <div className="picList">
                                            {this.renderPictures()}
                                        </div>
                                    </div>

                                    <input 
                                        type='file'
                                        accept='image/*'
                                        name='picture'
                                        onChange={this.pictureChange}
                                    />
                                    
                                    <div>
                                        <p>To upload</p>
                                        <img src={this.state.picture || this.state.avatar} alt="avatar" id="avatar" />
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
    };
};

export default connect(mapStateToProps)(PicturesForm);
