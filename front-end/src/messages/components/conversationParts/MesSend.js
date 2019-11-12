import React from 'react';

const MesSend = ({ message }) => (
    <div className="row message-body">
        <div className="col-sm-12 message-main-sender">
            <div className="sender">
                <div className="message-text">{message}</div>
                <span className="message-time pull-right">14:00</span>
            </div>
        </div>
    </div>
)

export default MesSend;