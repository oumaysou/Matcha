import React from 'react';
import Sidebar from '../components/Sidebar';
import Conversation from '../components/Conversation';
import '../css/messages.css';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
//        this.saveState = this.saveState.bind(this);
    }

    render() {
        return (
            <div className='messenger'>
                <div className="container app">
                  <div className="row app-one">
                    <Sidebar />
                    <Conversation />
                  </div>
                </div>
            </div>
        );
    }
}
