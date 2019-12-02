import React from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export default class ForgotPwForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            users: [],
            email: ''
        }

        this.sendMail = this.sendMail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentWillMount() {
        axios.get('/api/users/getUsers').then(({ data }) => {
            if (data.success)
                this.setState({ users: data.usersData, finish: true })
        }).catch(err => console.error('Error: ', err));
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    sendMail () {
        const email = this.state.email;
        const users = this.state.users;

        if (email === '') {
            NotificationManager.error('You have to fill the field', 'Sorry but...', 6000);
            return (false);
        }
        else {
            for (var i = 0; i < users.length; i++)
            {
                if (email === users[i].email) {
                    const sent = axios.get(`/api/users/passwordReset/${email}`).then(({data}) => {
                        if (data.success) {
                            return (true);
                        }
                    })
                    if (sent) {
                        NotificationManager.success('We sent you a mail with your new password', 'Success !', 6000);
                        return (true);
                    }
                    else {
                        NotificationManager.error('Something happenend when we tried to send the mail', 'Sorry but...', 6000);
                        return (false);
                    }
                }
            }
            NotificationManager.error('No account has been registered with this email', 'Sorry but...', 6000);
            return (false);
        }
    }

    render () {
        return (
            <div>
                <h5>Forgot password</h5>
                <div className="card-body">
                    <h5 className="card-title">Enter the email you registered with</h5>
                    <input 
                        type="text" 
                        name="email"
                        className="form-control" 
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Submit"
                        onClick={this.sendMail}
                    />
                </div>
            </div>
        )
    }
}