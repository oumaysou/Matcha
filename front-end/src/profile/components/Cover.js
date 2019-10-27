import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../general/components/utils';
import '../css/cover.css';

export default class Cover extends React.Component {
    getTheRightBtn() {
        const decoded = utils.decodedCookie();
        const { username } = this.props.profile;
        let theRightBtn = '';
        if (username === decoded.username) {
            const urlEdit = `/members/${username}/edit`;
            theRightBtn = <Link to={urlEdit}><button id='edit-btn' className="btn btn-primary text-center">Edit</button></Link>
        } else {
            theRightBtn = <button id='like-btn' className="btn btn-primary text-center">Like <i className="fa fa-heart"></i></button>;
        //    theRightBtn = <Like />
        }
        return theRightBtn;
    }

    render() {
        const { username, firstName, lastName, popularity, avatar } = this.props.profile;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="panel panel-default">
                            <div className="userpic">
                                <img src={avatar} alt="avatar" id="avatar" />
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
