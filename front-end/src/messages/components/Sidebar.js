import React from 'react';
import axios from 'axios';
import SidebarSearch from './SidebarSearch';
import SidebarResult from './SidebarResult';
import '../css/sidebar.css';

export default class Sidebar extends React.Component {
    constructor() {
        super()
        this.state = {
            allMatches: []
        }
        this.getAllMatches = this.getAllMatches.bind(this);
    }

    componentWillMount() {
        axios.get(`/api/matches/getall`).then(({ data }) => {
            if (data.success)
                this.setState({ allMatches: data.matches })
        })
    }

    getAllMatches() {
        const allMatches = this.props.allMatches;
        if (allMatches) {
            allMatches.map((match, index) => {
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
