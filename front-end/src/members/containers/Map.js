import React from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import utils from '../../general/components/utils';
import Marker from '../components/Marker';
import '../css/map.css';

export default class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            lat: 48.8911,
            lng: 2.3411
        }
        this.getMarkers = this.getMarkers.bind(this);
    }

    componentWillMount() {
        const decoded = utils.decodedCookie();
        if (decoded) {
            axios.get(`/api/users/username?value=${decoded.username}`).then(({ data }) => {
                //const lat = data.data.location.split(',')[0];
                //const lng = data.data.location.split(',')[1];
                const lat = 48.8534;
                const lng = 2.3488;
                this.setState({lat, lng})
            })

        }
    }

    getMarkers(users) {
        return users.map((user, index) => {
            return (
                <Marker
                    key={index}
                    lat= { this.state.lat }
                    lng= { this.state.lng }
                    member={ user.member }
                />
            );
        })
    }

    static defaultProps = {
        center: { lat: 48.8911 || this.state.lat , lng: 2.3411 || this.state.lng},
        zoom: 12
    };

    render() {
        const users = this.props.users;

        return (
            <div id='google-map' className='col-md-6 col-sm-12 col-xs-12 pull-right position-static'>
                <div style={{width: '100%', height: '90vh'}}>

                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDfMEOIYCjr5sC1IBCg6RNc5E7Jg1Iw9yM' }}
                        defaultCenter={ this.props.center }
                        defaultZoom={ this.props.zoom }
                    >

                        {this.getMarkers(users)}

                    </GoogleMapReact>

                </div>
            </div>
        );
    }
}
