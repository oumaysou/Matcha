import React from 'react';
import '../css/conversation.css';
import { thunk_getMessages } from '../../actions/thunk_register';
import { connect } from 'react-redux';
import ConvHeader from './conversationParts/ConvHeader';
import MesReceived from './conversationParts/MesReceived';
import MesSend from './conversationParts/MesSend';

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messsages: []
        };
    }

    componentDidMount() {
        this.props.dispatch(thunk_getMessages(this.state.messages));
    }

    render() {
        const isClicked = this.props.clicked
        const usernameClicked = this.props.usernameClicked
        if (isClicked) {
            
            return (
                <div className="col-sm-8 conversation">
                    <ConvHeader username = {usernameClicked}/>
                    <div className="row msg" id="conversation">
                        <MesReceived message = {usernameClicked}/>
                        <MesSend message = {usernameClicked}/>
                    </div>

                    <div className="row reply">
                        <div className="col-sm-11 col-xs-11 reply-main">
                            <textarea className="form-control" rows="1" id="comment"></textarea>
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-send">
                            <i className="fa fa-send fa-2x" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            );
        }
        else return <p>CLick on a User to Start Converstation</p>;
    }
}

const mapStateToProps = ({ usernameClicked, clicked, messages}) => {
    return {
        usernameClicked,
        clicked,
        messages: messages || []
    };
};

export default connect(mapStateToProps)(Conversation);