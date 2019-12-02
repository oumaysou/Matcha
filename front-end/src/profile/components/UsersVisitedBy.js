import React from 'react';
import '../css/visitedBy.css';

export default class UsersVisitedBy extends React.Component {
    render() {
        const visitedBy = this.props.visitedBy;
        if (visitedBy) {
            return visitedBy.map((user, index) => {
                let avatar = user.avatar.split('/').pop();
                return (
                    <tr key={index}>
                        <td><img src={process.env.PUBLIC_URL + '/img/' + avatar} alt="avatar" className="avatar-likedby" /></td>
                        <td><a href={'/members/' + user.username} className="a-visitedBy">{user.username}</a></td>
                        <td><p>{user.date}</p></td>
                    </tr>
                );
            })
        }
        else
            return <tr><td>Empty</td></tr>;
    }
}
