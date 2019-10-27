import React from 'react';
import Cookies from 'universal-cookie';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import NonUserNavbar from '../components/NonUserNavbar';
import UserNavbar from '../components/UserNavbar';
import '../css/header.css';

export default class Header extends React.Component {
    constructor() {
        super()

        this.state = {
            username: '',
            connected: false,
            nbVisits: 0,
            visitedBy: [],
            nbLikes: 0,
            likedBy: [],
            nbMessages: 0,
            unreadMessages: []
        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token') !== 'null' ? cookies.get('token') : '';
        if (token) {
            this.socket = io.connect('http://localhost:5000', { query: `token=${token}` });
            global.socket = this.socket;
            const decoded = jwtDecode(token);
            this.setState({ username: decoded.username, connected: true })
        }
    }

    render() {
        const { username } = this.state;
        const pathname = window.location.pathname.split('/')[1];
        if ( pathname === 'members' || pathname === 'messages') {
            return (
                <UserNavbar
                    username={username}
                    // nbVisits={nbVisits}
                    // nbLikes={nbLikes}
                    // nbMessages={nbMessages}
                />
            );
        }
        else {
            return <NonUserNavbar />;
        }
    }
}
