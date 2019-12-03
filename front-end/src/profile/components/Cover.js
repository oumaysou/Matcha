import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../general/components/utils';
import '../css/cover.css';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

export default class Cover extends React.Component {

    setLike = () => {
        const { username } = this.props.profile;
        axios.get(`/api/like/set/${username}`).then(({ data }) => {
            if (data.success) {
                console.log("Set");
            }
            else if (!data.success) {
                NotificationManager.error(data.message, 'Sorry but...', 6000);
            }
        })
        this.LoadOnce();
    }

    UnsetLike = async () => {
        const { username } = this.props.profile;
        await axios.get(`/api/like/Unset/${username}`).then(({ data }) => {
            if (data.success) {
                this.setState({ text: 'UnliKe' })
            }
            else if (!data.success) {
                NotificationManager.error(data.message, 'Sorry but...', 6000);
            }
        })
        this.LoadOnce();
    }

    LoadOnce = () => {
        var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
        // Current Time //
        var now = Date.now();
        // Total Process Lenght as Minutes //
        var tenSec = 1000;
        // End Time of Process //
        var plusTenSec = currentDocumentTimestamp + tenSec;
        if (now > plusTenSec) {
            window.location.reload();
        }
    }

    getTheRightBtn = () => {
        const decoded = utils.decodedCookie();
        const { username } = this.props.profile;
        let theRightBtn = '';
        if (username === decoded.username) {
            const urlEdit = `/members/${username}/edit`;
            theRightBtn = <Link to={urlEdit}><button id='edit-btn' className="btn btn-primary text-center">Edit</button></Link>
        }
        else if (this.props.profile.likedByMe.includes(username))
            theRightBtn = <button id='like-btn' className="btn btn-primary text-center" onClick={this.UnsetLike}>Unlike <i className="fa fa-thumbs-down"></i></button>;
        else if (this.props.profile.likedBy.includes(username))
            theRightBtn = <button id='like-btn' className="btn btn-primary text-center" onClick={this.setLike}>Like Back <i className="fa fa-heart"></i></button>;

        else if (!this.props.profile.likedByMe.includes(username))
            theRightBtn = <button id='like-btn' className="btn btn-primary text-center" onClick={this.setLike}>Like <i className="fa fa-heart"></i></button>;

        return theRightBtn;
    }

    render() {
        // console.log("state of Cover " + JSON.stringify(this.props.profile));
        const { username, firstName, lastName, popularity } = this.props.profile;
        const avatar = this.props.profile.avatar.split('/').pop();
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="panel panel-default">
                            <div className="userpic">
                                <img src={process.env.PUBLIC_URL + '/img/' + avatar} alt="avatar" id="avatar" />
                            </div>
                            <h3 className="name">{firstName} {lastName}</h3>
                            <h5>{username}</h5>
                            <p>Popularity:<b> {popularity} points</b></p>

                            {this.getTheRightBtn()}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
