import React from 'react';
import { Link } from 'react-router-dom';

export default class Marker extends React.Component {
    render() {
        const member = this.props.member;
        const urlProfile = `/members/${member.username}`;
        return (
            <div>
                <Link to={urlProfile}><img className='marker' src={member.avatar} alt=''/></Link>
            </div>
        );
    }
}
