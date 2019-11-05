import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectProfile = (props) => {

  const username = props.username;
  const profile = `/members/${username}`;
  // console.log("profile => " + JSON.stringify(props))
  return (
    <Redirect to={profile} />
  );
};

export default RedirectProfile;
