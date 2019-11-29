import React from 'react';
import SidebarSearch from './SidebarSearch';
import SidebarResult from './SidebarResult';
import '../css/sidebar.css';
import { thunk_getallMatches } from '../../actions/thunk_actions';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
    constructor() {
        super()
        this.state = {
            matches: []
        }
    }

    componentDidMount() {
        this.props.dispatch(thunk_getallMatches(this.state.matches));
    }

    getAllMatches() {
        const { matches } = this.props;

        if (matches.lenth !== 0) {
            return matches.map((match, index) => {
                return <SidebarResult key={index} match={match} />;
            })
        }
        else
            return <div className='text-center'><p>There is no matching yet</p></div>;
    }

    render() {
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

const mapStateToProps = ({ matches }) => { 
    return {
        matches: matches || []
    };
};

export default connect(mapStateToProps)(Sidebar);