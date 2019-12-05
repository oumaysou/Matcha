import React from "react";

class GetLocation extends React.Component {
    constructor () {
        super ()
        this.state = {
            longitude: "",
            latitude: ""
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
    }

    isEnabled () {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        } else {
            return false;
        }
    }

    displayLocationInfo (position) {
        this.setState({
            latitude:  position.coords.latitude,
            longitude: position.coords.longitude
        })

        return console.log(position.coords.latitude + " " + position.coords.longitude);
    }

    render () {
        const isEnabledd = this.isEnabled();
        if (isEnabledd) {
            console.log("bow" + this.state.latitude + this.state.longitude);
        }
        return (
            <div>
                Hello
            </div>
        )
    }
}

export default GetLocation;