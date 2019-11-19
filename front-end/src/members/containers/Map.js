// import React from 'react';
// import axios from 'axios';
// import GoogleMapReact from 'google-map-react';
// import utils from '../../general/components/utils';
// import Marker from '../components/Marker';
// import '../css/map.css';

// export default class Map extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             lat: 48.8911,
//             lng: 2.3411
//         }
//         this.getMarkers = this.getMarkers.bind(this);
//     }

//     componentWillMount() {
//         const decoded = utils.decodedCookie();
//         if (decoded) {
//             axios.get(`/api/users/username?value=${decoded.username}`).then(({ data }) => {
//                 //const lat = data.data.location.split(',')[0];
//                 //const lng = data.data.location.split(',')[1];
//                 const lat = 48.8534;
//                 const lng = 2.3488;
//                 this.setState({lat, lng})
//             })

//         }
//     }

//     getMarkers(users) {
//         return users.map((user, index) => {
//             return (
//                 <Marker
//                     key={index}
//                     lat= { this.state.lat }
//                     lng= { this.state.lng }
//                     member={ user.member }
//                 />
//             );
//         })
//     }

//     static defaultProps = {
//         center: { lat: 48.8911 || this.state.lat , lng: 2.3411 || this.state.lng},
//         zoom: 12
//     };

//     render() {
//         const users = this.props.users;

//         return (
//             <div id='google-map' className='col-md-6 col-sm-12 col-xs-12 pull-right position-static'>
//                 <div style={{width: '100%', height: '90vh'}}>

//                     <GoogleMapReact
//                         bootstrapURLKeys={{ key: 'AIzaSyDfMEOIYCjr5sC1IBCg6RNc5E7Jg1Iw9yM' }}
//                         defaultCenter={ this.props.center }
//                         defaultZoom={ this.props.zoom }
//                     >

//                         {this.getMarkers(users)}

//                     </GoogleMapReact>

//                 </div>
//             </div>
//         );
//     }
// }

import React, { Component } from 'react';

import axios from 'axios';
import utils from '../../general/components/utils';

import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

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

// const markers = {
//   leuven1: [[50.879, 4.6997], 13],
//   leuven2: [[50.874, 4.6947], 13],
//   brussels: [[50.85050, 4.35149], 11],
//   ghent: [[51.0514, 3.7103], 12],
//   coast: [[51.2214, 2.9541], 10]
// }

function isMapBox (provider) {
  return provider === 'streets' || provider === 'satellite' || provider === 'outdoors' || provider === 'light' || provider === 'dark'
}

const MapboxAttribution = () => (
  <span className='map-attribution'>
    <span>© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a></span>{' | '}
    <span>© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a></span>{' | '}
  </span>
)

const StamenAttribution = () => (
  <span className='map-attribution'>
    Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.
  </span>
)

const WikimediaAttribution = () => (
  <span className='map-attribution'>
    Map tiles by <a href='https://foundation.wikimedia.org/w/index.php?title=Maps_Terms_of_Use#Where_does_the_map_data_come_from.3F'>Wikimedia</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>
  </span>
)

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
    if (this.state.loaded === true)
    {
      const { center, zoom, provider, animate, metaWheelZoom, twoFingerDrag, zoomSnap, mouseEvents, touchEvents, minZoom, maxZoom } = this.state
      return (
        <div className="text-center">
            <h3>Map</h3>
            <hr style={{width: 600}}/>
            <div style={{maxWidth: 800, margin: '0 auto'}}>
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
                    attribution={
                    isMapBox(provider)
                        ? <MapboxAttribution />
                        : provider === 'stamen'
                        ? <StamenAttribution />
                        : provider === 'wikimedia'
                            ? <WikimediaAttribution />
                            : null}
                    defaultWidth={800}
                    height={800}
                    boxClassname="pigeon-filters">
                    {this.getAllMarkers()}
                    {this.getMarkerUser()}
                    {isMapBox(provider) && <span className='mapbox-wordmark' />}
                </Map>
            </div>
        </div>
      )
    }
    else
    {
      return <utils.loading />;
    }
  }
}
