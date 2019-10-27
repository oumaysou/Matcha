import React from 'react';
import axios from 'axios';
import utils from '../../general/components/utils';
import EditForm from '../components/EditForm';
import { NotificationManager } from 'react-notifications';
import RedirectToProfile from '../../general/components/RedirectToProfile';

export default class Edit extends React.Component {
    constructor() {
        super()

        this.state = {
            oldusername: '',
            username: '',
            firstName: '',
            lastName: '',
            gender: '',
            password: '',
            passwordCfm: '',
            orientation: '',
            location: '',
            address: '',
            bio: '',
            avatar: '',
            birthday: '',
            photos: [],
            tags: [],
            updated: false
        };
    }

    componentWillMount() {
        const decoded = utils.decodedCookie();
        if (decoded) {
            axios.get(`/api/users/profile/${decoded.username}`).then(({data}) => {
                if (data.success) {
                    this.setState({
                        oldusername: data.userData.username,
                        username: data.userData.username,
                        firstName: data.userData.firstName,
                        lastName: data.userData.lastName,
                        gender: data.userData.gender,
                        orientation: data.userData.orientation,
                        location: data.userData.location,
                        birthday: data.userData.birthday,
                        avatar: data.userData.avatar,
                        bio: data.userData.bio,
                        photos: data.photos,
                        tags: data.tags
                    })
                }
            }).catch(err => console.error('Error Edit.js ', err));
        }
    }

    saveEdit = () => {
        const user = Object.assign({}, this.state);
        console.log('oldusername => ' + user.oldusername);
        console.log('username => ' + user.username);
        axios.post('/api/update', user).then(({ data }) => {
            const { success, message } = data;
            if (success) {
                NotificationManager.success(message, 'Success !', 3000);
                this.setState({ updated: true });
            }
            else
                NotificationManager.error(message, 'Sorry but...', 3000);
        })
        .catch(err => console.error('Error: ', err));
    }

    saveState = (name, value) => {
      this.setState({ [name]: value });
    }

    render() {
        switch (this.state.updated) {
            case true:
                return <RedirectToProfile username={this.state.username} />;
            default:
                return (
                    <EditForm
                        user={this.state}
                        onSubmit={this.saveEdit}
                        onChange={this.saveState}
                    />
                );
        }
    }
}
