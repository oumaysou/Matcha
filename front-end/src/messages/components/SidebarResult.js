import React from 'react';
import { connect } from 'react-redux';

class SidebarResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameClicked: ""
        };
    }

    onClick = (e) => {
        e.preventDefault();
        this.setState({ usernameClicked: this.props.match });
    }
    render() {
        const username = this.props.match;
        // console.log("store SidebarResult" + JSON.stringify(this.props, null, 4));
        return (
            <div className="row sideBar" onClick={this.onClick}>
                <div className="row sideBar-body">
                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                        <div className="avatar-icon">
                            <img src="" alt='' />
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
            </ div >
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        data: state
    };
};

export default connect(mapStateToProps)(SidebarResult);