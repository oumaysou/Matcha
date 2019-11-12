import React from 'react';
import '../css/conversation.css';
// import { thunk_getMessages } from '../../actions/thunk_actions';
import { connect } from 'react-redux';
import ConvHeader from './conversationParts/ConvHeader';
import MesReceived from './conversationParts/MesReceived';
import MesSend from './conversationParts/MesSend';
import NoMessage from './conversationParts/NoMessage';
import InputForm from './../../general/components/InputForm';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageSen: [],
            message: '',
            messageSent: '',
            messageRec: []
        };
    }

    componentWillUnmount() {
        this.socket.off();
    }

    componentDidMount() {
        socket.on('chat-message', message => {
            this.state.messageRec.push(message)
            const Rec = this.state.messageRec
            this.setState({ messageRec: Rec })
        })
    }

    handleInputChange = (name, value) => {
        this.setState({ message: value })
    }

    onClick = (e) => {
        e.preventDefault();
        if (this.state.message)
            this.state.messageSen.push(this.state.message)
        const New = this.state.messageSen
        this.setState({ messageSen: New })
        if (this.state.messageSen) {
            const msg = this.state.message
            socket.emit('send-chat-message', msg)
        }
        this.setState({ message: '' })
    }

    messageSent = () => {
        const allMessage = this.state.messageSen;
        if (allMessage.length > 0) {
            return allMessage.map((message, index) => {
                return <MesSend message={message} key={index} />
            })
        }
    }

    messageRec = () => {
        const allMessage = this.state.messageRec;
        if (allMessage.length > 0) {
            return allMessage.map((message, index) => {
                return <MesReceived message={message} key={index} />
            })
        }
    }

    render() {
        // console.log("reduc ", JSON.stringify(this.props));
        const isClicked = this.props.clicked
        const usernameClicked = this.props.usernameClicked
        if (isClicked) {
            return (
                <div className="col-sm-8 conversation">
                    <ConvHeader username={usernameClicked} />
                    <div className="row msg" id="conversation">
                        {this.messageSent()}
                        {this.messageRec()}
                    </div>

                    <div className="row reply">
                        <div className="col-sm-11 col-xs-11 reply-main">
                            <InputForm
                                type="text"
                                name="messagetosend"
                                placeholder="Ecrivez un message"
                                value={this.state.message}
                                onChange={this.handleInputChange}
                                classNameChat="form-control text-left"
                            />
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-send" onClick={this.onClick} onChange={this.handleInputChange}>
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