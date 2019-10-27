import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const isAuthenticated = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const decoded = jwtDecode(token);
    return decoded.username;
  } catch (err) {
    return null;
  }
};

const PublicRoute = ({ component, ...props }) => {
  const username = isAuthenticated();
  if (username) {
    const profile = `/members/${username}`;
    return <Redirect to={profile} />;
  }
  return <Route {...props} component={component} />;
};

const PrivateRoute = ({ component, ...props }) => {
  if (isAuthenticated()) {
    return <Route {...props} component={component} />;
  }
  return <Redirect to="/" />;
};

export { PrivateRoute, PublicRoute };
