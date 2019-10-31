import React from 'react';
import Sidebar from '../components/Sidebar';
import Conversation from '../components/Conversation';
import '../css/messages.css';
import { connect } from 'react-redux';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        //        this.saveState = this.saveState.bind(this);
    }

    render() {
        // console.log("store message" + JSON.stringify(this.props, null, 4));
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

const mapStateToProps = state => {
    return {
        data: state
    };
};

export default connect(mapStateToProps)(Messages);