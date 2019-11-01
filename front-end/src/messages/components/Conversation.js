import React from 'react';
import '../css/conversation.css';
import { thunk_getMessages } from '../../actions/thunk_register';
import { connect } from 'react-redux';

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messsage: []
        };
        //        this.saveState = this.saveState.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(thunk_getMessages(this.state.messages));
    }

    render() {
        const isClicked = this.props.clicked
        const usernameClicked = this.props.usernameClicked
        console.log("Converstion.js\n" + JSON.stringify(this.props, null, 4));
        if (isClicked) {
            
            return (
                <div className="col-sm-8 conversation">
                    <div className="row heading">
                        <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                            <div className="heading-avatar-icon">
                                <img src="https://www.bigmouthvoices.com/profile_picture/large/default-profile_picture.jpg" alt='' />
                            </div>
                        </div>
                        <div className="col-sm-8 col-xs-7 heading-name">
                            <a className="heading-name-meta">{usernameClicked}</a>
                            <span className="heading-online">Online</span>
                        </div>
                    </div>

                    <div className="row msg" id="conversation">
                        <div className="row message-body">
                            <div className="col-sm-12 message-main-receiver">
                                <div className="receiver">
                                    <div className="message-text">Hello !</div>
                                    <span className="message-time pull-right">13:00</span>
                                </div>
                            </div>
                        </div>

                        <div className="row message-body">
                            <div className="col-sm-12 message-main-sender">
                                <div className="sender">
                                    <div className="message-text">Yo !</div>
                                    <span className="message-time pull-right">14:00</span>
                                </div>
                            </div>
                        </div>
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

const mapStateToProps = ({ usernameClicked, clicked }) => {
    // console.log(JSON.stringify(state))
    return {
        usernameClicked,
        clicked
    };
};

export default connect(mapStateToProps)(Conversation);