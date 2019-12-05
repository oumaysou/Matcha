import React from 'react';
import '../css/likedBy.css';

export default class UsersLikedBy extends React.Component {
    render() {
        const likedBy = this.props.likedBy;
        const avatar = 'like.png';
        if (likedBy) {
            return likedBy.map((user, index) => {
                return (
                    <tr key={index}>
                        <td><img src={process.env.PUBLIC_URL + '/img/' + avatar} alt="avatar" className="avatar-likedby" /></td>
                        <td><a href={'/members/' + user} className="a-likedBy">{user}</a></td>
                    </tr>
                );
            })
        }
        return <tr><td>Empty</td></tr>;
    }
}
