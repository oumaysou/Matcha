import React from 'react';
import { connect } from 'react-redux';
import { thunk_usernameClicked } from '../../actions/thunk_actions';
import { get } from 'lodash';

class SidebarResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onClick = (e) => {
        e.preventDefault();
        const usernameClicked = this.props.match;
        this.props.dispatch(thunk_usernameClicked(usernameClicked));
    }
    render() {
        const username = this.props.match;
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
                                <span className="time-meta pull-right">chat now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ div >
        );
    }
}

const mapStateToProps = state => {
    return {
        usernameClicked: get(state, 'state.usernameCLicked')
    };
};

export default connect(mapStateToProps)(SidebarResult);