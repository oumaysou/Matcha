import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute, PublicRoute } from './SecureRoute';
import Template from './general/components/Template';
import SignIn from './general/containers/SignIn';
import Register from './general/containers/Register';
import utils from './general/components/utils';
import Activate from './general/containers/Activate';
import Profile from './profile/containers/Profile';
import Edit from './profile/containers/Edit';
import Messages from './messages/containers/Messages';
import Members from './members/containers/Members';
import usersMap from './members/containers/Map';
import store from './store/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Template location={this.props.location} >
            <Switch>
              <PublicRoute exact path="/" component={SignIn} />
              <PublicRoute exact path="/register" component={Register} />
              <Route exact path="/activate" component={Activate} />
              <PrivateRoute exact path="/members" component={Members} />
              <PrivateRoute exact path="/members/:username" component={Profile} />
              <PrivateRoute exact path="/members/:username/edit" component={Edit} />
              <PrivateRoute exact path="/messages" component={Messages} />
              <PrivateRoute exact path="/map/:username" component={usersMap} />
              <Route component={utils.pageNotFound} />
            </Switch>
          </Template>
        </Router>
      </Provider>
    );
  }
}
