import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Tags from './Tag';
import '../css/info.css';

export default class Info extends React.Component {
    constructor() {
        super()
        this.state = {
            age: '',
            gender: '',
            orientation: '',
            latitude: '',
            longitude: '',
            address: '',
            lastConnection: '',
            tags: ''
        }
    }

    componentWillMount() {
        const {
            birthday,
            gender,
            orientation,
            location,
            lastConnection
        } = this.props.profile;

        const age = moment().diff(birthday, 'years');
        const latitude = location.split(',')[0];
        const longitude = location.split(',')[1];
        this.setState({ age, birthday, gender, orientation, latitude, longitude, lastConnection })
    }

    componentDidMount() {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=AIzaSyBhsxTkddjmFdZsCPq82usy-ASv1ATzpV0`;
        axios.get(url).then((data) => {
            return this.setState({address: data.data.results[0].formatted_address});
        }).catch(err => console.error('Error: ', err));
    }

    render() {
        return (
            <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Informations</h4>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-12">
                            <table id='infos'>
                                <tbody>
                                    <tr>
                                        <td><b>Age</b></td>
                                        <td>{this.state.age}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gender</b></td>
                                        <td>{this.state.gender}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Orientation</b></td>
                                        <td>{this.state.orientation}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Address</b></td>
                                        <td>{this.state.address}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Last connection</b></td>
                                        <td>{this.state.lastConnection}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Tags</b></td>
                                        <td>
                                            <Tags tags={this.state.tags} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
