import React from 'react';
import '../css/conversation.css';
import { thunk_getMessages } from '../../actions/thunk_actions';
import { connect } from 'react-redux';
import ConvHeader from './conversationParts/ConvHeader';
import MesReceived from './conversationParts/MesReceived';
import MesSend from './conversationParts/MesSend';
import NoMessage from './conversationParts/NoMessage';
import InputForm from './../../general/components/InputForm';
// import socket from '../../../../back-end/sockets/socketIo';

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            value: ""
        };
    }

    componentDidMount() {
        this.props.dispatch(thunk_getMessages(this.state.messages));
    }

    handleInputChange = (name, value) => {
        this.setState({ messages: value })
    }

    onClick = (messages) => {
        console.log(messages)
    }

    render() {
        // console.log("reduc ", JSON.stringify(this.state));
        const isClicked = this.props.clicked
        const usernameClicked = this.props.usernameClicked
        if (isClicked) {

            return (
                <div className="col-sm-8 conversation">
                    <ConvHeader username={usernameClicked} />
                    <div className="row msg" id="conversation">
                        <MesReceived message={usernameClicked} />
                        <MesSend message={usernameClicked} />
                    </div>

                    <div className="row reply">
                        <div className="col-sm-11 col-xs-11 reply-main">
                            <InputForm
                                type="text"
                                name="messagetosend"
                                placeholder="Ecrivez un message"
                                onChange={this.handleInputChange}
                                classNameChat="form-control text-left"
                            />
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-send" onClick={() => { this.onClick(this.state.messages) }}>
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