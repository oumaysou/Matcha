import React from 'react';
import '../css/conversation.css';
// import { thunk_getMessages } from '../../actions/thunk_actions';
import { connect } from 'react-redux';
import ConvHeader from './conversationParts/ConvHeader';
import MesReceived from './conversationParts/MesReceived';
import MesSend from './conversationParts/MesSend';
import NoMessage from './conversationParts/NoMessage';
// import InputForm from './../../general/components/InputForm';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000");

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageSen: [],
            message: '',
            messageSent: '',
            messageRec: [],
            allMessages: [],
        };
        socket.on('chat-message', message => {
            const last = {
                ...this.state.allMessages,
                msgToReceive: message
            }
            this.setState({ allMessages: last })
        })
    }
    getAll = (username) => {
        axios.get(`/api/message/getallmessages/${username}`).then(({ data }) => {
            const { success, allMessages } = data;
            if (success === true)
                success == true
            else
                console.log("Error get all messages")
        })
            .catch(err => console.error('Error catch: ' + err))
    }

    componentWillUnmount() {
        this.socket.off();
    }

    handleInputChange = (e) => {
        this.setState({ message: e.target.value })
    }

    storeMessage = (message) => {
        const username = this.props.usernameClicked
        axios.put(`/api/storemessage/${message}/${username}`).then(({ data }) => {
            const { success } = data;
            if (success === true)
                console.log('Message Stored')
            else
                console.log('nothing')
        })
            .catch(err => console.error('Error to store msg: ' + err))
    }

    onKey = (e) => {
        if (e.keyCode === 13)
            this.onClick(e);
    }

    onClick = (e) => {
        e.preventDefault();
        this.storeMessage(this.state.message);
        if (this.state.message) {
            const msg = this.state.message
            const last = {
                ...this.state.allMessages,
                msgToSend: msg
            }
            this.setState({ allMessages: last })
            socket.emit('send-chat-message', msg)
        }
        this.setState({ message: "" })
    }

    showAllMessages = () => {

        console.log("LAST => " + JSON.stringify(this.state.allMessages))
        const obj = this.state.allMessages;
        if (obj.msgToReceive)
            return <div>
                <MesReceived message={obj.msgToReceive} key={1} />
                <MesSend message={obj.msgToSend} key={2} />
            </div>
        else if (obj.msgToSend)
            return <div>
                <MesSend message={obj.msgToSend} key={2} />

            </div>

    }

    //     var myObject = { 'a': 1, 'b': 2, 'c': 3 };

    // Object.keys(myObject).map(function(key, index) {
    //   myObject[key] *= 2;
    // });

    // console.log(myObject);

    render() {
        // console.log("Mon test allMessages: " + JSON.stringify(this.state.allMessages))
        const isClicked = this.props.clicked
        const usernameClicked = this.props.usernameClicked
        if (isClicked) {
            this.getAll(this.props.usernameClicked)
            return (
                <div className="col-sm-8 conversation">
                    <ConvHeader username={usernameClicked} />
                    <div className="row msg" id="conversation">
                        {this.showAllMessages()}
                    </div>

                    <div className="row reply">
                        <div className="col-sm-11 col-xs-11 reply-main">
                            <input className="inputchat" name="inputchat" onKeyDown={this.onKey} value={this.state.message} onChange={this.handleInputChange} />
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-send" onClick={this.onClick} >
                            <i className="fa fa-send fa-2x" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            );
        }
        else return <NoMessage />;
    }
}

const mapStateToProps = ({ usernameClicked, clicked, messages }) => {
    return {
        usernameClicked,
        clicked,
        messages: messages || []
    };
};

export default connect(mapStateToProps)(Conversation);