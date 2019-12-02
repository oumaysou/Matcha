import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import '../css/filters.css'
import axios from 'axios';
import UserCard from '../components/UserCard';

export default class Filters extends React.Component {
    constructor() {
        super();
        this.state = {
            mostAdmired: ""
        }
        this.getAdmired = this.getAdmired.bind(this);
    }

    componentWillMount() {
        axios.get('api/members/getall').then(({ data }) => {
            if (data.success)
                this.setState({ users: data.usersData, finish: true })
        }).catch(err => console.error('Error: ', err));
    }

    getAdmired() {
        const admired = this.mostAdmired = 1;
        console.log(admired);
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row col-md-6 col-sm-12 col-xs-12 filters'>
                    <div id='filter-basic'>
                        <input className='col-md-10 col-sm-10 col-xs-10' type="text" placeholder="Search a tag" />
                        <div className='col-md-2 col-sm-2 col-xs-2 pull-right'>
                            <ButtonToolbar>
                                <DropdownButton
                                    bsSize="small"
                                    title="Filters"
                                    id="dropdown-size-small"
                                >
                                    {/* <MenuItem onClick={this.getAllUserCard}>Must Admired</MenuItem> */}
                                    <MenuItem onClick={this.getAdmired}>Must Admired</MenuItem>
                                    <MenuItem onClick={() => {console.log("2")}}>Age: Low to High</MenuItem>
                                    <MenuItem onClick={() => {console.log("3")}}>Age: High to Low</MenuItem>
                                    <MenuItem onClick={() => {console.log("4")}}>Person close to you</MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}