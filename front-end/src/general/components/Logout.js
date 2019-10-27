import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavItem } from 'react-bootstrap';

export default class Logout extends React.Component {

  disconnect = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    axios.put(`/api/users/connected?value=0&token=${token}`).then(data => {
        cookies.remove('token', { path: '/' });
        global.socket.disconnect();
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
        <NavItem eventKey={4} onClick={this.disconnect} href='/'>
            Log out
        </NavItem>
    );
  }
}
