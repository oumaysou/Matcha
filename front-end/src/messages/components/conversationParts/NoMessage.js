import React from "react";

const NoMessage = () => (
    <div className="nomessage">
        <img src={process.env.PUBLIC_URL + '/img/fleche.gif'} alt="NoMessage" />
        <p className="startconversation">Please Start Conversation</p>
        <img src={process.env.PUBLIC_URL + '/img/NoMessage.gif'} alt="NoMessage" />

    </div>
)

export default NoMessage;