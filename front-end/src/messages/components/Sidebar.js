import React from 'react';
import SidebarSearch from './SidebarSearch';
import SidebarResult from './SidebarResult';
import '../css/sidebar.css';
import { thunk_getall } from '../../actions/thunk_register';
import { connect } from 'react-redux';
import { get } from 'lodash'

class Sidebar extends React.Component {
    constructor() {
        super()
        this.state = {
            allMatches: []
        }
        this.getAllMatches = this.getAllMatches.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(thunk_getall(this.state.allMatches));
    }

    getAllMatches() {
        const { matches } = this.props;
        // console.log("Sidebar.js\n" + JSON.stringify(this.props, null, 4));

        if (matches.lenth !== 0) {
            return matches.map((match, index) => {
                return <SidebarResult key={index} match={match} />;
            })
        }
        else
            return <div className='text-center'><p>There is no matching yet</p></div>;
    }

    render() {
        // console.log("store Sidebar" + JSON.stringify(this.props, null, 4));
        const allMatches = this.state.allMatches;
        return (
            <div className="col-sm-4 side">
                <div className="side-one">
                    <SidebarSearch allMatches={allMatches} />

                    {this.getAllMatches()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        matches: get(state, 'state.matches', [])
    };
};

export default connect(mapStateToProps)(Sidebar);