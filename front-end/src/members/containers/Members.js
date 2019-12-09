import React from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import utils from '../../general/components/utils';

import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';



// import Slider, { Range } from 'rc-slider';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';

import UsersMap from './Map';

// import { Dropdown } from 'react-bootstrap';
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
            minAdmired: '1',
            maxAdmired: '0',
            minAge: '0',
            maxAge: '0',
            myLocation: '',
            myAge: '',
            myPopularity: '',
            myOrientation: '',
            myGender: '',
            val: 0,
            displayMenu: false,
            finish: false,
            message: '',
            // success: '',
        };
        // this.getAllUserCard = this.getAllUserCard.bind(this);
        // this.getAdmired = this.getAdmired.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.updateTag = this.updateTag.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
    }

    // TENGO QUE REVISAR EL CUMPLEANOS BUSCARLO DONDE ESTA IMPRIMIENDO PARA EL CALCULO



    componentWillMount = async () => {
        await axios.get('api/users/getall').then(({ data }) => {
            if (data.success)
                this.setState({
                    users: data.usersData,
                    myLocation: data.myLocation,
                    myOrientation: data.myOrientation,
                    myPopularity: data.myPopularity,
                    myAge: data.myAge,
                    myGender: data.myGender,
                    finish: true,
                    username: data.myUsername
                })
        }).catch(err => console.error('Error: ', err));
    }

    updateAdmired = () => {
        const minAdmired = this.state.minAdmired;
        const maxAdmired = this.state.maxAdmired;
        // console.log("minAdmired ", minAdmired);
        // console.log("maxAdmired ", maxAdmired);
        axios.get(`api/members/getall/${minAdmired}/${maxAdmired}`).then(({ data }) => {
            // console.log("users ousssama "+data.usersData)
            if (data.success)
                this.setState({
                    users: data.usersData,
                    finish: true
                })
            else if (!data.success) {
                NotificationManager.warning(data.message, 'Verify !', 3000);
            }
        }).catch(err => console.error('Error: ', err));
    }

    updateAge = () => {
        const minAge = this.state.minAge;
        const maxAge = this.state.maxAge;
        // console.log("Members age min ", minAge);
        // console.log("Members age max ", maxAge);
        axios.get(`api/members/getalls/${minAge}/${maxAge}`).then(({ data }) => {
            // console.log("users ousssama "+data.usersData)
            if (data.success)
                this.setState({
                    users: data.usersData,
                    finish: true
                })
            else if (!data.success) {
                NotificationManager.warning(data.message, 'Verify !', 3000);
            }
        }).catch(err => console.error('Error: ', err));
    }

    updateTag = (event) => {
        // const latitude = location.split(',')[0];
        // const longitude = location.split(',')[1];
        // const id = event.currentTarget.dataset.id
        const nam = event.currentTarget.dataset.name
        // this.setState({

        //     id: event.currentTarget.dataset.id,
        axios.get(`api/updatetag/${nam}`).then(({ data }) => {
            // console.log("users ousssama "+data.usersData)
            if (data.success)
                this.setState({
                    users: data.usersData,
                    finish: true
                })
        }).catch(err => console.error('Error: ', err));

        // });

        // console.log(this.id);


        // console.log("1", this.state.name);
        // console.log(event.target.name);
        // console.log(this.state.name);
        // console.log(event.target.value);

        // SELECT latitude, longitude, SQRT(
        // POW(69.1 * (latitude - [startlat]), 2) +
        // POW(69.1 * ([startlng] - longitude) * COS(latitude / 57.3), 2)) AS distance
        // FROM TableName HAVING distance < 25 ORDER BY distance; 

        // console.log("2", event.target.location);

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

    getPosition = (value) => {
        const myLat = this.state.myLocation.split(',')[0];
        const myLong = this.state.myLocation.split(',')[1];

        this.setState({ val: value })


        axios.get(`api/members/getdistances/${myLat}/${myLong}/${value}`).then(({ data }) => {
            // console.log("coco", data.usersData)
            if (data.success)
                this.setState({
                    users: data.usersData,
                    finish: true
                })
        }).catch(err => console.error('Error: ', err));
    }

    updateMatcha = () => {
        const myLat = this.state.myLocation.split(',')[0];
        const myLong = this.state.myLocation.split(',')[1];
        const oSex = this.state.myOrientation;
        const myAge = this.state.myAge;
        const myPopularity = this.state.myPopularity;
        const myGender = this.state.myGender;

        axios.get(`api/members/getmatch/${myLat}/${myLong}/${myAge}/${oSex}/${myPopularity}/${myGender}`).then(({ data }) => {
            if (data.success)
                this.setState({
                    users: data.usersData,
                    finish: true
                })
            else if (!data.success) {
                NotificationManager.warning(data.message, 'Verify !', 3000);
            }
        }).catch(err => console.error('Error: ', err));

    }

    // updateMatchaAfter = (event) => {
    //     event.preventDefault();
    //     this.setState({displayMenu: false}, () => {
    //         document.removeEventListener('click', this.updateMatchaAfter);
    //     });
    //     console.log("ok2");
    // }

    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu = () => {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

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
        // console.log("oumaysou MDF => " + this.state.myLocation)
        // console.log("oumaysou MDF => " + JSON.stringify(this.state.users[0]))
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);
        const Handle = Slider.Handle;

        const handle = (props) => {
            const { value, dragging, index, ...restProps } = props;

            return (
                <Tooltip
                    prefixCls="rc-slider-tooltip"
                    overlay={value}
                    visible={dragging}
                    placement="top"
                    key={index}
                >
                    <Handle value={value} {...restProps} />
                </Tooltip>
            );
        };
        const wrapperStyle = { width: 100, margin: 15, marginTop: 0 };
        // const { minAdmired, maxAdmired } = this.state;
        if (this.state.finish) {
            return (
                <div className='wrapper'>
                    <div className='container-fluid'>
                        <div className='container-fluid'>
                            {/* <div className='row col-md-6 col-sm-12 col-xs-12 filters'> */}
                                    <div id='filter-basic'>
                                        <form className="dropdown-tag">
                                            <div className="button-tag" onClick={this.showDropdownMenu}>Search a tag</div>
                                            { this.state.displayMenu ? (
                                                <ul onClick={this.showDropdownMenu} className="ul-tag">
                                                    {/* <li "><a className="active" href="#Create Page">Create Page</a></li> */}
                                                    <li onClick={this.updateTag}  data-id="1" data-name="soccer" className="li-tag"><a href="#Soccer">Soccer</a></li>
                                                    <li onClick={this.updateTag} data-id="2" data-name="beach" className="li-tag"><a href="#Beach">Beach</a></li>
                                                    <li onClick={this.updateTag} data-id="3" data-name="date" className="li-tag"><a href="#Date">Date</a></li>
                                                    <li onClick={this.updateTag} data-id="4" data-name="computer" className="li-tag"><a href="#Computer">Computer</a></li>
                                                    <li onClick={this.updateTag} data-id="5" data-name="money" className="li-tag"><a href="#Money">Money</a></li>
                                                    <li onClick={this.updateTag} data-id="6" data-name="sport" className="li-tag"><a href="#Sport">Sport</a></li>
                                                </ul>
                                            ): (null)}
                                        </form>
                                        <form onSubmit={this.handleSubmit} className="admired">
                                            <p>Must Admired:</p>
                                            <input 
                                                type="number"
                                                required = "required"
                                                name="minAdmired"
                                                placeholder="Min"
                                                maxLength = "5"
                                                min="0"
                                                max="9999"
                                                // maxLength="3"
                                                // size="6"
                                                // value={this.state}
                                                onChange={this.handleInputChange}  
                                            />
                                            <p className="line">-</p>
                                            <input 
                                                type="number" 
                                                required = "required"
                                                name="maxAdmired"
                                                placeholder="Max"
                                                maxLength = "5"
                                                min="0"
                                                max="9999"
                                                // maxLength="3"
                                                // size="6"
                                                // value={this.state}
                                                onChange={this.handleInputChange}
                                            />
                                            <button className="filterButton" onClick={this.updateAdmired}>></button>
                                        </form>
                                        <form onSubmit={this.handleSubmit} className="admired">
                                            <p>Age:</p>
                                            <input 
                                                type="number"
                                                required = "required"
                                                name="minAge"
                                                placeholder="Min"
                                                maxLength = "5"
                                                min="0"
                                                max="99"
                                                // size="6"
                                                onChange={this.handleInputChange}  
                                            />
                                            <p className="line">-</p>
                                            <input 
                                                type="number"
                                                required = "required"
                                                name="maxAge" 
                                                placeholder="Max" 
                                                maxLength = "5"
                                                min="0"
                                                max="99"
                                                // size="6"
                                                onChange={this.handleInputChange}  
                                            />
                                            <button className="filterButton" onClick={this.updateAge}>></button>
                                        </form>
                                        <form onSubmit={this.handleSubmit} style={{display: "none"}} className="admired">
                                            <p>Around you:</p>
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
                                        <form onSubmit={this.handleSubmit} className="admired">
                                            <p>Around you:</p>
                                            <Slider 
                                                style={wrapperStyle} 
                                                min={0} 
                                                defaultValue={0} 
                                                marks={{ 0:0 , 20:20, 50:50, 100:100 }}
                                                handle={handle}
                                                railStyle={{ backgroundColor: 'grey'}}
                                                dotStyle={{ borderColor: 'grey' }}
                                                step={null} 
                                                activeDotStyle={{borderColor: '#FF5252'}}
                                                trackStyle={{backgroundColor: '#FF5252'}}
                                                handleStyle={{borderColor: '#FF5252'}}
                                                onChange={this.getPosition}
                                            />
                                        </form>
                                        <form onSubmit={this.handleSubmit} className="button-tag">
                                            <button className="filterButton-a" onClick={this.updateMatcha}>Matcha!</button>
                                        </form>

                                        {/* <Slider dots step={20} defaultValue={100} onAfterChange={log} 
                                        dotStyle={{ borderColor: 'orange' }} activeDotStyle={{ borderColor: 'yellow' }} /> */}

                                {/* <MenuItem onClick={this.updateAdmired}>Min Admired</MenuItem> */}
                                {/*<MenuItem onClick={this.updateAdmired}>Max Admired</MenuItem>
                                        <button onClick={this.sortByPriceAsc}>Age: Low to High</button>
                                        <MenuItem onClick={console.log("ok")}>Age: High to Low</MenuItem>
                                        <MenuItem onClick={() => {console.log("4")}}>Person close to you</MenuItem> */}


                                {/* </div> */}
                            </div>
                            <div style={{ display: "none" }}>
                                <div style={wrapperStyle}>
                                    <p>Slider with custom handle</p>
                                    <Slider min={0} max={20} defaultValue={3} handle={handle} />
                                </div>
                                <div style={wrapperStyle}>
                                    <p>Reversed Slider with custom handle</p>
                                    <Slider min={0} max={20} reverse defaultValue={3} handle={handle} />
                                </div>
                                <div style={wrapperStyle}>
                                    <p>Slider with fixed values</p>
                                    <Slider min={20} defaultValue={20} marks={{ 20: 20, 40: 40, 100: 100 }} step={null} />
                                </div>
                                <div style={wrapperStyle}>
                                    <p>Range with custom tooltip</p>
                                    <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
                                </div>
                            </div>
                            <div className="row" id="map">
                                <UsersMap username={this.state.username} users={this.state.users}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div id='listing-member'>
                                {this.getAllUserCard()}
                            </div>
                        </div>
                    </div>
                </div >
            );
        }
        else
            return <utils.loading />;
    }
}
