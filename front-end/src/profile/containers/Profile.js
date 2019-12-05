import React from 'react';
import axios from 'axios';
import Cover from '../components/Cover';
import Bio from '../components/Bio';
import Slider from '../components/Slider';
import Info from '../components/Info';
import LikedBy from '../components/LikedBy';
import VisitedBy from '../components/VisitedBy';
import utils from '../../general/components/utils';
import '../css/profile.css';
import GetLocation from '../../geolocation/getLocation';

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            popularity: '',
            gender: '',
            orientation: '',
            lastConnection: '',
            location: '',
            city: '',
            bio: '',
            avatar: '',
            birthday: '',
            photos: [],
            likedBy: [],
            visitedBy: [],
            tags: [],
            finish: false
        };
    }

    componentWillMount() {
        const profileUser = this.props.match.params.username;
        const decoded = utils.decodedCookie();
        if (decoded) {
            axios.get(`/api/users/profile/${profileUser}`).then(({ data }) => {
                this.setState({
                    username: data.userData.username,
                    firstName: data.userData.firstName,
                    lastName: data.userData.lastName,
                    popularity: data.userData.popularity,
                    gender: data.userData.gender,
                    orientation: data.userData.orientation,
                    lastConnection: data.userData.lastConnection,
                    location: data.userData.location,
                    city: data.userData.city,
                    birthday: data.userData.birthday,
                    avatar: data.userData.avatar,
                    bio: data.userData.bio,
                    photos: data.photos,
                    likedBy: data.likedBy,
                    likedByMe: data.likedByMe,
                    visitedBy: data.visitedBy,
                    tags: data.tags,
                    finish: true
                })
            }).catch(err => console.error('Error: ', err));
        }
    }
    LoadOnce = () => {
        var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
        // Current Time //
        var now = Date.now();
        // Total Process Lenght as Minutes //
        var tenSec = 1000;
        // End Time of Process //
        var plusTenSec = currentDocumentTimestamp + tenSec;
        if (now > plusTenSec) {
            window.location.reload();
        }
    }

    render() {
        this.LoadOnce();
        if (this.state.finish) {
            console.log(this.state.birthday);
            
            return (

                <div id='profile'>
                    <Cover profile={this.state} />
                    <Bio profile={this.state} />
                    <div className="container">
                        <div className="row">
                            <Slider profile={this.state} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <LikedBy profile={this.state} />
                                <VisitedBy profile={this.state} />
                                <Info profile={this.state} />
                            </div>
                        </div>
                    </div>
                    <GetLocation />
                </div>
            );
        }
        else
            return <utils.loading />;
    }
}
