import React from 'react';
import { Link } from 'react-router-dom';
// import Like from '../containers/Like'
import '../css/userCard.css'

export default class UserCard extends React.Component {
    render() {
        const { avatar, username, popularity , firstName, lastName} = this.props.user.member;
        const urlProfile = '/members/' + username;

        // console.log(this.props.user.member);
        return (
            <div className="col-sm-3">
                <div className="card-body text-center">
                    <Link to={urlProfile}><img className="card-img-top col" src={avatar} alt='' /></Link>
                    <h4 className="card-title-a"><Link to={urlProfile}>{username}</Link></h4>
                    {/* <h3 className="name">{firstName} {lastName}</h3> */}
                    <h5 className="card-title-b">{firstName} {lastName}</h5>
                    <h5 className="card-title-c">Popularity: {popularity} points</h5>
                    {/* <Like user={this.props.user.member} /> */}
                </div>
            </div>
        );
    }
}
