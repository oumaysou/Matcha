import React from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import utils from '../../general/components/utils';
// import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

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
            mostAdmired: '',
            finish: false
        };
        // this.getAllUserCard = this.getAllUserCard.bind(this);
        // this.getAdmired = this.getAdmired.bind(this);
        this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
        // this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
    }

    sortByPriceAsc() {
        const users = this.state.users;

        this.setState(prevState => {
            users.sort((a, b) => (a.popularitys - b.popularitys))

            console.log(users);
            // console.log(popularity);
            // console.log(user.member.popularity);
            // console.log(users.member.popularity);
        });
        console.log("ok 2");
    }
    
    //   sortByPriceDesc() {
    //     this.setState(prevState => {
    //         this.state.users.sort((a, b) => (b.price - a.price))
    //     });
    // }

   
    
    componentWillMount() {
        // const mostAdmired = "1"
        
        // if (mostAdmired === "1")
        // {
        //     axios.get('api/members/getall').then(({ data }) => {
        //         if (data.success)
        //             this.setState({ users: data.usersData, finish: true })
        //     }).catch(err => console.error('Error: ', err));
        // }
        // else {
            axios.get('api/users/getall').then(({ data }) => {
                if (data.success)
                    this.setState({ users: data.usersData, finish: true })
            }).catch(err => console.error('Error: ', err));
        // }
    }

    updateAdmired = () => {
        axios.get('api/members/getall').then(({ data }) => {
            if (data.success)
                this.setState({ users: data.usersData, finish: true })
        }).catch(err => console.error('Error: ', err));
    }

    getAllUserCard() {
        const users = this.state.users;
        // const users = this.state.users.filter(
        //     (user) => {
        //         return (user.member.popularity)
        //     }
        // );
        
        // const popularity = this.state.users.popularity;
        if (users[0]) {
            let i = 0;
            return users.map((user, index) => {
                console.log(user.member.popularity);
                console.log(users[i].member.popularity);
                i++;
                // if (this.mostAdmired === "1") {
                return <UserCard user={user} key={index} />;
                
                // }
                // console.log("kk");
            })
        }
        else
            return <div className='text-center'><p>There is no users yet</p></div>;
    }

    render() {
        if (this.state.finish) {
            return (
                <div className='wrapper'>
                    <div className='container-fluid'>
                        <div className='container-fluid'>
                            {/* <div className='row col-md-6 col-sm-12 col-xs-12 filters'> */}
                                    <div id='filter-basic'>
                                        {/* <h3 className="title">Filters</h3> */}
                                        <div className="tag">
                                            <input type="text" placeholder="Search a tag" />
                                        </div> 
                                        <div className="admired">
                                            <p>Must Admired:</p>
                                            <input type="text" name="must admired" placeholder="Min" maxlength="5" size="6"/>
                                            <p className="line">-</p>
                                            <input type="text" name="must admired" placeholder="Max" maxlength="5" size="6"/>
                                        </div>
                                        <div className="age">
                                            <p>Age:</p>
                                            <input type="text" name="must admired" placeholder="Min" maxlength="5" size="6"/>
                                            <p className="line">-</p>
                                            <input type="text" name="must admired" placeholder="Max" maxlength="5" size="6"/>
                                        </div>
                                        <div className="admired">
                                            <p>Around you:</p>
                                            <input type="text" name="must admired" placeholder="Min-km" maxlength="3" size="10"/>
                                            <p className="line">-</p>
                                            <input type="text" name="must admired" placeholder="Max" maxlength="3" size="10"/>
                                        </div>
                                        {/* <MenuItem onClick={this.updateAdmired}>Min Admired</MenuItem>
                                        <MenuItem onClick={this.updateAdmired}>Max Admired</MenuItem>
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
