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
import lodash from 'lodash';

const socket = io("http://127.0.0.1:5000/");

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMessages: [],
            key: 0,
            finish: true,
            Clicked: '',
            inputchat: ''
        };
        socket.on('chat-message', message => {
            let key = this.state.key;
            let actu = this.state.allMessages;
            actu.push(<MesReceived message={message} key={key} />)
            this.setState({ allMessages: actu, key: key + 1 })
        });
    }

    getAll = async () => {
        if (this.state.finish || this.state.Clicked !== this.props.usernameClicked) {
            let username = this.props.usernameClicked;
            await axios.get(`/api/message/getallmessages/${username}`).then(({ data }) => {
                const { success, allMessages } = data;
                if (success === true) {
                    let all = allMessages
                    let userTo = username
                    this.mapMessages(all, userTo, username)
                }
                else
                    console.log("Error get all messages")
            })
                .catch(err => console.error('Error catch: ' + err))
        }
    }

    componentWillUnmount() {
        socket.emit('disconnect')
    }

    mapMessages = (all, userTo, username) => {
        let test = []
        let x = 0
        all = lodash.orderBy(all, ['id'], ['asn'])
        all.forEach((obj, key) => {
            x++;
            if (obj.messageBy !== userTo) {
                test.push(<MesSend message={obj.message} key={key} />);
            }
            else if (obj.messageBy === userTo) {
                test.push(<MesReceived message={obj.message} key={key} />)
            }
        })
        this.setState({ allMessages: test, key: x + 1, finish: false, Clicked: username })
    }

    handleInputChanges = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    storeMessage = (message) => {
        const username = this.props.usernameClicked
        let userData = { username: username, message: message }
        axios.post(`/api/storemessage`, userData).then(({ data }) => {
            const { success } = data;
            if (success === true)
                console.log('Message Stored')
            else
                console.log('Request failed : the msg doesn\'t be stored')
        })
            .catch(err => console.error('Error to store msg: ' + err));
    }

    onKey = (e) => {
        if (e.keyCode === 13)
            this.onClick(e);
    }

    onClick = (e) => {
        e.preventDefault();
        let actu = this.state.allMessages;
        let key = this.state.key
        let user = this.props.usernameClicked;
        let msg = this.state.inputchat;
        msg = msg.trim();
        if (msg) {
            this.storeMessage(msg);
            actu.push(<MesSend message={msg} key={key} />);
            this.setState({ allMessages: actu })
            this.setState({ key: key + 1 })
            socket.emit('send-chat-message', user, msg)
        }
        this.setState({ inputchat: '' })
    }

    showMessage = () => {
        this.getAll();
        let all = this.state.allMessages;
        return all.map((msg) => {
            return msg
        })
    }

    render() {
        const isClicked = this.props.clicked;
        if (isClicked) {
            return (
                <div className="col-sm-8 conversation">
                    <ConvHeader username={this.props.usernameClicked} />
                    <div className="row msg" id="conversation">
                        {this.showMessage()}
                    </div>

                    <div className="row reply">
                        <div className="col-sm-11 col-xs-11 reply-main">
                            <input type="text" className="inputchat" name="inputchat" onKeyDown={this.onKey} value={this.state.inputchat} onChange={this.handleInputChanges} />
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