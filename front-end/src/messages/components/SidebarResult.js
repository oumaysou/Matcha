import React from 'react';

export default class SidebarResult extends React.Component {
    render() {
        const { avatar, username } = this.props.match;
        return (
            <div className="row sideBar">
                <div className="row sideBar-body">
                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                        <div className="avatar-icon">
                            <img src={avatar} alt='' />
                        </div>
                    </div>
                    <div className="col-sm-9 col-xs-9 sideBar-main">
                        <div className="row">
                            <div className="col-sm-8 col-xs-8 sideBar-name">
                                <span className="name-meta">{username}</span>
                            </div>
                            <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                                <span className="time-meta pull-right">18:18</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
