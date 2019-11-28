import React from 'react';

export default class UsersLikedBy extends React.Component {
    render() {
        const likedBy = this.props.likedBy;
        const avatar = this.props.avatar.split('/').pop();
        if (likedBy) {
            return likedBy.map((user, index) => {
                return (
                    <tr key={index}>
                        <td><img src={process.env.PUBLIC_URL + '/img/' + avatar} alt="avatar" className="avatar-likedby" /></td>
                        <td><h5>{user}</h5></td>
                    </tr>
                );
            })
        }
        return <tr><td>Empty</td></tr>;
    }
}
