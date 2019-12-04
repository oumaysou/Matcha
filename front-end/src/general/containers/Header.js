import React from 'react';
import Cookies from 'universal-cookie';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import NonUserNavbar from '../components/NonUserNavbar';
import UserNavbar from '../components/UserNavbar';
import '../css/header.css';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

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
            unreadMessages: [],
            once: true
        }
    }

    getLike = async () => {
        let user = this.state.username;
        await axios.get(`/api/like/get/${user}`).then(({ data }) => {
            console.log("Ici => ", JSON.stringify(data))
            if (data.success) {
                if (data.notifLike > 0)
                    return NotificationManager.success(`vous avez ${data.notifLike} Like`, 'Success', 9000)
            }
            else if (!data.success)
                console.log("Error getLike Header.js wow")
        }).catch(err => console.log("Error =>" + err))
    }

    getMsg = async () => {
        await axios.get('/api/messageToMe/getMyMsg').then(({ data }) => {
            if (data.success && data.nbMsg) {
                NotificationManager.success(`Vous avec reçu ${data.nbMsg} nouveaux messages`, 'Success', 9000)
            }
            else if (!data.success)
                console.log("Error getLike Header.js")
        })
            .catch(err => console.log("Error ex ex " + err))
    }

    getVisit = async () => {
        let user = this.state.username;
        let visiteur = [];
        await axios.get(`/api/users/profile/${user}`).then(({ data }) => {
            if (data.success) {
                data.visitedBy.forEach(user => {
                    visiteur.push(user.username)
                })
                visiteur = new Set(visiteur)
                visiteur.forEach(user => {
                    NotificationManager.success(`${user} a visité votre profile`, 'Success', 9000)
                })
            }
            else if (!data.success)
                console.log("Error getVisit Header.js wow")
        }).catch(err => console.log("Error =>" + err))
    }

    componentWillMount() {
        const cookies = new Cookies();
        const token = cookies.get('token') !== 'null' ? cookies.get('token') : '';
        if (token) {
            this.socket = io.connect('http://localhost:5000', { query: `token=${token}` });
            global.socket = this.socket;
            const decoded = jwtDecode(token);
            this.setState({ username: decoded.username, connected: true })
        }
    }

    removeAll = async () => {
        await axios.delete('/api/deleteAll').then(({ data }) => {
            if (data.success)
                console.log("All notif deleted")
            else
                console.log('Error')
        });
    }

    notif = () => {
        if (this.state.once) {
            this.getLike();
            this.getMsg();
            this.getVisit();
            this.setState({ once: false });
            this.removeAll();
        }
    }

    render() {
        const { username } = this.state;
        const pathname = window.location.pathname.split('/')[1];
        if (pathname === 'activate' || ((pathname === 'members' || pathname === 'messages' || pathname === 'map') || this.state.connected)) {
            return (
                <UserNavbar
                    username={username}
                    // nbVisits={nbVisits}
                    nbLikes={this.state.likedBy.length}
                    // nbMessages={nbMessages}
                    onClick={this.notif}
                />
            );
        }
        else {
            return <NonUserNavbar />;
        }
    }
}
