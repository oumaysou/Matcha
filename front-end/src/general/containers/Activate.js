import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NotificationManager } from 'react-notifications';
import utils from '../components/utils';
import RedirectToProfile from '../components/RedirectToProfile';

export default class Activate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            confirmToken: '',
            auth: false,
            username: '',
            isValid: undefined,
            pageNotExist: false
        };

        this.parseQuery = this.parseQuery.bind(this);
        this.sendState = this.sendState.bind(this);
    }

    componentWillMount() {
        const { value, pageNotExist } = this.parseQuery();
        this.setState({ email: '' || value[0], confirmToken: '' || value[1], pageNotExist });
    }

    componentDidMount() {
        if (this.state.pageNotExist === false)
            this.sendState();
    }

    parseQuery() {
        if (this.props.location.search) {
            const queries = this.props.location.search.split('&');
            const fields = queries.map(query => {
                const querySplited = Array.from(query);
                if (querySplited[0] === '?')
                    querySplited.splice(0, 1);
                return query = querySplited.join('').split('=')[0];
            });
            const value = queries.map(query => query.split('=')[1]);
            if (queries && fields[0] === 'email' && fields[1] === 'token' && value)
                return {fields, value, pageNotExist: false};
            else
                return {fields: '', value: '', pageNotExist: true};
        }
        return {pageNotExist: true, value: ''};
    }

    sendState() {
        const emailToken = Object.assign({}, this.state);
        axios.post('/api/users/activate', emailToken).then(({ data }) => {
            const cookieUsername = utils.decodedCookie();
            if (cookieUsername && cookieUsername === data.userData[0].username)
                this.setState({ isValid: true });
            else {
                const { success, message } = data;

                if (success === true) {
                    const username = data.userData[0].username;
                    const cookies = new Cookies();
                    cookies.set('token', data.userData[0].token, { path: '/' });
                    NotificationManager.success(message, 'Success !', 6000);
                    this.setState({ auth: true, username });
                }
                else {
                    this.setState({ auth: false });
                    NotificationManager.error(message, 'Sorry but...', 6000);
                }
            }
        })
        .catch(err => console.error('Error: ', err));
    }

    render() {
        if (this.state.isValid === true) {
            return <utils.invalidToken />;
        }
        else if (this.state.pageNotExist) {
            return <utils.pageNotFound />;
        }
        else {
            switch (this.state.auth) {
                case true:
                    return <RedirectToProfile username={this.state.username} />;
                case false:
                    return <utils.invalidToken />;
                default:
                    return <utils.loading />;
            }
        }
    }
}
