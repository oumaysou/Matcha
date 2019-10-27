import React from 'react';
import '../css/utils.css';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

const pageNotFound = () => (<div className="page-error text-center">{"Sorry but this page doesn't exist."}</div>);

const loading = () => (
    <div className='full-width-anime text-center'>
        <i className="fa fa-spinner fa-spin"/>
    </div>
);

const invalidToken = () => (
  <div className="page-error text-center">
      <p>This link is not valid anymore.</p>
  </div>
);

const decodedCookie = () => {
    const cookies = new Cookies();
    const token = cookies.get('token') !== 'null' ? cookies.get('token') : '';
    if (token) {
        const decoded = jwtDecode(token);
        return decoded;
    }
}

export default {
    pageNotFound,
    loading,
    invalidToken,
    decodedCookie
};
