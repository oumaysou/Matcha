import React from 'react';
import axios from 'axios';
// import MapContainer from './Map';
import UserCard from '../components/UserCard';
import utils from '../../general/components/utils';
import '../css/members.css';

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
            finish: false
        };
        this.getAllUserCard = this.getAllUserCard.bind(this);
    }

    componentWillMount() {
        axios.get('/api/users/getall').then(({ data }) => {
            if (data.success)
                this.setState({ users: data.usersData, finish: true })
        }).catch(err => console.error('Error: ', err));
    }

    getAllUserCard() {
        const users = this.state.users;
        if (users[0]) {
            return users.map((user, index) => {
                return <UserCard user={user} key={index} />;
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
