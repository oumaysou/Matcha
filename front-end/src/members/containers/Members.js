import React from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import utils from '../../general/components/utils';
// import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
// import { MenuItem } from 'react-bootstrap';


import '../css/members.css';
import '../css/filters.css'

export default class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            likedMe: '',
            likedByMe: '',
            username: '',
            gender: '',
            orientation: '',
            birthday: '',
            avatar: '',
            minAdmired: '',
            maxAdmired: '',
            minAge: '',
            maxAge: '',
            finish: false
        };
        // this.getAllUserCard = this.getAllUserCard.bind(this);
        // this.getAdmired = this.getAdmired.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
    }
    
    // TENGO QUE REVISAR EL CUMPLEANOS BUSCARLO DONDE ESTA IMPRIMIENDO PARA EL CALCULO

    componentWillMount() {
        axios.get('api/users/getall').then(({ data }) => {
            if (data.success)
                this.setState({ users: data.usersData, finish: true })
        }).catch(err => console.error('Error: ', err));
    }

    updateAdmired = () => {
        const minAdmired = this.state.minAdmired;
        const maxAdmired = this.state.maxAdmired;
        console.log("minAdmired ", minAdmired);
        console.log("maxAdmired ", maxAdmired);
        axios.get(`api/members/getall/${minAdmired}/${maxAdmired}`).then(({ data }) => {
            // console.log("users ousssama "+data.usersData)
            if (data.success)
                this.setState({ 
                    users: data.usersData,
                    finish: true 
                })
        }).catch(err => console.error('Error: ', err));
    }

    updateAge = () => {
        const minAge = this.state.minAge;
        const maxAge = this.state.maxAge;
        console.log("Members age min ", minAge);
        console.log("Members age max ", maxAge);
        axios.get(`api/members/getalls/${minAge}/${maxAge}`).then(({ data }) => {
            // console.log("users ousssama "+data.usersData)
            if (data.success)
                this.setState({ 
                    users: data.usersData,
                    finish: true 
                })
        }).catch(err => console.error('Error: ', err));
    }

    getAllUserCard() {
        const users = this.state.users;
        if (users[0]) {
            // let i = 0;
            return users.map((user, index) => {
                // console.log(user.member.popularity);
                // console.log(users[i].member.popularity);
                // i++;
                // if (this.mostAdmired === "1") {
                return <UserCard user={user} key={index} />;
                
                // }
            })
        }
        else
            return <div className='text-center'><p>There is no users yet</p></div>;
    }

    // handleChange(event) {
    //     this.setState({
    //         value: event.target.value
    //     });
    //     console.log(event.target.value);
    //   }

    handleSubmit = (event) => {
        event.preventDefault();
        // const data = this.state
        // console.log('final data: ', data);
    }

    handleInputChange = (event) => {
        event.preventDefault();
        // console.log(event);

        // console.log(event.target.name);
        // console.log(event.target.value);
        
        this.setState({
            [event.target.name]: event.target.value,
            // maxAdmired: event.target.value
        });
    }

    render() {
        // const { minAdmired, maxAdmired } = this.state;
        if (this.state.finish) {
            return (
                <div className='wrapper'>
                    <div className='container-fluid'>
                        <div className='container-fluid'>
                            {/* <div className='row col-md-6 col-sm-12 col-xs-12 filters'> */}
                                    <div id='filter-basic'>
                                        {/* <h3 className="title">Filters</h3> */}
                                        <form className="tag">
                                            <input type="text" placeholder="Search a tag" />
                                            <button className="filterButton">></button>
                                        </form>
                                        <form onSubmit={this.handleSubmit} className="admired">
                                            <p>Must Admired:</p>
                                            <input 
                                                type="text"
                                                name="minAdmired"
                                                placeholder="Min"
                                                maxLength="5"
                                                size="6"
                                                // value={this.state}
                                                onChange={this.handleInputChange}  
                                            />
                                            <p className="line">-</p>
                                            <input 
                                                type="text" 
                                                name="maxAdmired"
                                                placeholder="Max"
                                                maxLength="5"
                                                size="6"
                                                // value={this.state}
                                                onChange={this.handleInputChange}
                                            />
                                            <button className="filterButton" onClick={this.updateAdmired}>></button>
                                        </form>
                                        <form onSubmit={this.handleSubmit} className="admired">
                                            <p>Age:</p>
                                            <input 
                                                type="text"
                                                name="minAge"
                                                placeholder="Min"
                                                maxLength="2"
                                                size="6"
                                                onChange={this.handleInputChange}  
                                            />
                                            <p className="line">-</p>
                                            <input 
                                                type="text"
                                                name="maxAge" 
                                                placeholder="Max" 
                                                maxLength="2" 
                                                size="6"
                                                onChange={this.handleInputChange}  
                                            />
                                            <button className="filterButton" onClick={this.updateAge}>></button>
                                        </form>
                                        <form onSubmit={this.handleSubmit} className="admired">
                                            <p>Around you (km):</p>
                                            <input 
                                                type="text" 
                                                name="must admired" 
                                                placeholder="Min" 
                                                maxLength="3" 
                                                size="10"
                                                onChange={this.handleInputChange}      
                                            />
                                            <p className="line">-</p>
                                            <input 
                                                type="text" 
                                                name="must admired" 
                                                placeholder="Max" 
                                                maxLength="3" 
                                                size="10"
                                                onChange={this.handleInputChange}  
                                            />
                                            <button className="filterButton" onClick={this.updateAdmired}>></button>
                                        </form>
                                         {/* <MenuItem onClick={this.updateAdmired}>Min Admired</MenuItem> */}
                                        {/*<MenuItem onClick={this.updateAdmired}>Max Admired</MenuItem>
                                        <button onClick={this.sortByPriceAsc}>Age: Low to High</button>
                                        <MenuItem onClick={console.log("ok")}>Age: High to Low</MenuItem>
                                        <MenuItem onClick={() => {console.log("4")}}>Person close to you</MenuItem> */}
                                        
                                      
                                    {/* </div> */}
                                </div>
                            </div>
                        <div className='row'>
                            <div id='listing-members' className='col'>
                                {this.getAllUserCard()}
                            </div>
                        </div>
                    </div >
                </div >
            );
        }
        else
            return <utils.loading />;
    }
}
