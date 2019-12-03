import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavItem } from 'react-bootstrap';

export default class Logout extends React.Component {

  disconnect = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    cookies.remove('token', { path: '/' });
    console.log("token => ", token)
    axios.put(`/api/users/connected?value=0&token=${token}`).then(data => {
      global.socket.disconnect();

    })
      .catch(err => console.error('Error: ', err));
    // this.LoadOnce();
  }

  LoadOnce = () => {
    var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
    // Current Time //
    var now = Date.now();
    // Total Process Lenght as Minutes //
    var tenSec = 1000;
    // End Time of Process //
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
      window.location.reload();
    }
  }

  render() {
    return (
      <NavItem eventKey={4} onClick={this.disconnect} href='/'>
        Log out
        </NavItem>
    );
  }
}
