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

const socket = io("http://localhost:5000");

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            allMessages: [],
            msgstored: {},
            key: 0,
            finish: false,
            close: true
        };
        socket.on('chat-message', message => {
            let key = this.state.key;
            let actu = this.state.allMessages;
            actu.push(<MesReceived message={message} key={key} />)
            this.setState({ allMessages: actu, key: key + 1 })
        });
    }
    getAll = async (username) => {
        if (!this.state.finish) {
            await axios.get(`/api/message/getallmessages/${username}`).then(({ data }) => {
                const { success, allMessages } = data;
                if (success === true) {
                    let all = allMessages
                    let userto = username
                    let test = []
                    all = lodash.orderBy(all, ['id'], ['asn'])
                    return all.map((obj, key) => {
                        if (obj.messageBy !== userto) {
                            test.push(<MesSend message={obj.message} key={key} />);
                            key += 1;
                        }
                        else if (obj.messageBy === userto) {
                            test.push(<MesReceived message={obj.message} key={key} />)
                            key += 1;
                        }
                        return this.setState({ allMessages: test, finish: true, key: key + 1 })
                    })
                }
                else
                    console.log("Error get all messages")
            })
                .catch(err => console.error('Error catch: ' + err))
        }
    }

    // componentWillUnmount() {
    //     this.socket.off();
    // }

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

        this.storeMessage(this.state.message);
        if (this.state.message) {
            const msg = this.state.message
            actu.push(<MesSend message={msg} key={key} />);
            this.setState({ allMessages: actu })
            this.setState({ key: key + 1 })
            socket.emit('send-chat-message', msg)
        }
        this.setState({ message: "" })
    }

    showMessage = () => {
        let all = this.state.allMessages;
        return all.map((msg) => {
            return msg
        })
    }

    // showStoredMsg = () => {
    //     if (this.state.close) {


    //         })
    //     }
    // }

    render() {
        console.log("Allmessage => " + JSON.stringify(this.state.allMessages))
        const isClicked = this.props.clicked
        const usernameClicked = this.props.usernameClicked
        if (isClicked) {
            this.getAll(usernameClicked)
            return (
                <div className="col-sm-8 conversation">
                    <ConvHeader username={usernameClicked} />
                    <div className="row msg" id="conversation">
                        {this.showMessage()}
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