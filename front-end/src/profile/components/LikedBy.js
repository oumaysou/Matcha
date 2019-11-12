import React from 'react';
import UsersLikedBy from './UsersLikedBy';
import '../css/likedBy.css';

export default class LikedBy extends React.Component {
    render() {
        const { likedBy, avatar } = this.props.profile;
        // console.log("LikeBy.js " + JSON.stringify(this.props.profile))
        return (
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Liked by</h4>
                    </div>
                    <div className="panel-body scroll">
                        <div className="col-md-12">
                            <table id='liked-by'>
                                <tbody>
                                    <UsersLikedBy likedBy={likedBy} avatar={avatar} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
