import React from 'react';

const ConvHeader = ({ username }) => (
    < div className="row heading" >
        <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
            <div className="heading-avatar-icon">
                <img src="https://www.bigmouthvoices.com/profile_picture/large/default-profile_picture.jpg" alt='' />
            </div>
        </div>
        <div className="col-sm-8 col-xs-7 heading-name">
            <a href={"members/" + username} className="heading-name-meta">{username}</a>
            <span className="heading-online">Online</span>
        </div>
    </div >
)

export default ConvHeader;