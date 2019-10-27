import React from 'react';
import { NotificationContainer } from 'react-notifications';
import Header from '../containers/Header';
import Footer from './Footer';

export default class Template extends React.Component {
    render() {
        return (
          <div className="App">
            <Header location={this.props.location} />
                {this.props.children}
            <NotificationContainer />
            <Footer />
          </div>
        );
    }
}
