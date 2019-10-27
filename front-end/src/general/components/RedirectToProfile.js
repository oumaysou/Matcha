import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectProfile = (props) => {
  const username = props.username;
  const profile = `/members/${username}`;
  return (
    <Redirect to={profile} />
  );
};

export default RedirectProfile;
