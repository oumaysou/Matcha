import React, { Component } from 'react';

import axios from 'axios';
import utils from '../../general/components/utils';

import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

import '../css/map.css'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGlnZW9uLW1hcHMiLCJhIjoiY2l3eW01Y2E2MDA4dzJ6cWh5dG9pYWlwdiJ9.cvdCf-7PymM1Y3xp5j71NQ'

const mapbox = (mapboxId, accessToken) => (x, y, z, dpr) => {
  return `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}?access_token=${accessToken}`
}

const providers = {
  osm: (x, y, z) => {
    const s = String.fromCharCode(97 + (x + y + z) % 3)
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
  },
  wikimedia: (x, y, z, dpr) => {
    return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`
  },
  stamen: (x, y, z, dpr) => {
    return `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.jpg`
  },
  streets: mapbox('streets-v10', MAPBOX_ACCESS_TOKEN),
  satellite: mapbox('satellite-streets-v10', MAPBOX_ACCESS_TOKEN),
  outdoors: mapbox('outdoors-v10', MAPBOX_ACCESS_TOKEN),
  light: mapbox('light-v9', MAPBOX_ACCESS_TOKEN),
  dark: mapbox('dark-v9', MAPBOX_ACCESS_TOKEN)
}

export default class usersMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      center: [],
      zoom: 14,
      provider: 'wikimedia',
      metaWheelZoom: false,
      twoFingerDrag: false,
      animate: true,
      animating: false,
      zoomSnap: true,
      mouseEvents: true,
      touchEvents: true,
      minZoom: 1,
      maxZoom: 18,
      dragAnchor: [48.8565, 2.3475],
      loaded: false,
      user: [],
      allUsers: []
    }
  }

    componentWillMount() {
        const profileUser = this.props.match.params.username;
        const decoded = utils.decodedCookie();
        if (decoded) {
            axios.get(`/api/users/profile/${profileUser}`).then(({ data }) => {
                this.setState({
                    center : [parseFloat(data.userData.location.split(',')[0]), parseFloat(data.userData.location.split(',')[1])],
                    loaded : true,
                    user : data.userData
                })
        }).catch(err => console.error('Error: ', err));
        }
        axios.get(`/api/users/getall`).then(({ data }) => {
        if (data.success)
            this.setState({ allUsers: data.usersData, finish: true })
        }).catch(err => console.error('Error: ', err));
    }

    getMarkerUser() {
        const user = this.state.user;
        return  <Marker 
                    key={0} 
                    anchor={[parseFloat(user.location.split(',')[0]), parseFloat(user.location.split(',')[1])]} 
                    payload={user.username}
                    onClick={this.handleMarkerClick}
                />
    }

    getAllMarkers() {
        const users = this.state.allUsers;
        if (users[0]) {
            return users.map((user, index) => {
                return  <Marker 
                            key={index} 
                            anchor={[parseFloat(user.member.location.split(',')[0]), parseFloat(user.member.location.split(',')[1])]} 
                            payload={user.member.username}
                            onClick={this.handleMarkerClick}
                        />
            })
        }
        else
            return (0);
    }


  zoomIn = () => {
    this.setState({
      zoom: Math.min(this.state.zoom + 1, 18)
    })
  }

  zoomOut = () => {
    this.setState({
      zoom: Math.max(this.state.zoom - 1, 1)
    })
  }

  handleBoundsChange = ({ center, zoom, bounds, initial }) => {
    if (initial) {
      //console.log('Got initial bounds: ', bounds)
    }
    this.setState({ center, zoom })
  }

  handleClick = ({ event, latLng, pixel }) => {
    console.log('Map clicked!', latLng, pixel)
  }

    handleMarkerClick = ({ event, payload, anchor}) => {
        let path = `/members/` + payload;
        this.props.history.push(path);
    }

  render () {
    const { center, zoom, provider, animate, metaWheelZoom, twoFingerDrag, zoomSnap, mouseEvents, touchEvents, minZoom, maxZoom } = this.state
    return (
    <div className="div-map">
        <Map
            limitBounds='edge'
            center={center}
            zoom={zoom}
            provider={providers[provider]}
            dprs={[1, 2]}
            onBoundsChanged={this.handleBoundsChange}
            onClick={this.handleClick}
            animate={animate}
            metaWheelZoom={metaWheelZoom}
            twoFingerDrag={twoFingerDrag}
            zoomSnap={zoomSnap}
            mouseEvents={mouseEvents}
            touchEvents={touchEvents}
            minZoom={minZoom}
            maxZoom={maxZoom}
            boxClassname="pigeon-filters">
            {this.getAllMarkers()}
            {this.getMarkerUser()}
        </Map>
    </div>
    )
  }
}
