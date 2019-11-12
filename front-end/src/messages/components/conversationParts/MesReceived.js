import React from 'react';

const MesReceived = ({ message }) => (
    <div className="row message-body">
        <div className="col-sm-12 message-main-receiver">
            <div className="receiver">
                <div className="message-text">{message}</div>
                <span className="message-time pull-right">13:00</span>
            </div>
        </div>
    </div>
)

export default MesReceived;