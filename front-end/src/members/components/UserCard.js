import React from 'react';
import { Link } from 'react-router-dom';
import Like from '../containers/Like'
import '../css/userCard.css'

export default class UserCard extends React.Component {
    render() {
        const { avatar, username, popularity } = this.props.user.member;
        const urlProfile = '/members/' + username;

        return (
            <div className="card col-sm-3">
                <div className="card-body text-center">
                    <Link to={urlProfile}><img className="card-img-top col" src={avatar} alt='' /></Link>
                    <h4 className="card-title"><Link to={urlProfile}>{username}</Link></h4>
                    <h5 className="card-text">{popularity} points</h5>
                    <Like user={this.props.user.member} />
                </div>
            </div>
        );
    }
}
