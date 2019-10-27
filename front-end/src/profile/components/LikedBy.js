import React from 'react';
import UsersLikedBy from './UsersLikedBy';
import '../css/likedBy.css';

export default class LikedBy extends React.Component {
    render() {
        const { likedBy } = this.props.profile;
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
                                    <UsersLikedBy likedBy={likedBy} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
