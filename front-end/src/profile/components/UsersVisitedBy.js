import React from 'react';

export default class UsersVisitedBy extends React.Component {
    render() {
        const visitedBy = this.props.visitedBy;
        if (visitedBy) {
            return visitedBy.map((user, index) => {
                return (
                    <tr key={index}>
                        <td><img src={user.avatar} alt="avatar" className="avatar-likedby" /></td>
                        <td><h5>{user.username}</h5></td>
                        <td><p>{user.date}</p></td>
                    </tr>
                );
            })
        }
        else
            return <tr><td>Empty</td></tr>;
    }
}
