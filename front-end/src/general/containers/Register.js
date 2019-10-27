import React from 'react';
import RegisterForm from '../components/RegisterForm';
import IndexLayout from '../components/IndexLayout';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

// const API_KEY = 'AIzaSyDfMEOIYCjr5sC1IBCg6RNc5E7Jg1Iw9yM'; 

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            birthday: '',
            password: '',
            passwordCfm: '',
            gender: '',
            orientation: '',
            location: '',
        };
        // this.saveState = this.saveState.bind(this);
        // this.createUser = this.createUser.bind(this);
    }



//   locationAccepted(location) {
//     if (location.data.status === 'OK') {
//       this.setState({
//         location: location.data.results[2].formatted_address,
//       });
//     }
//     else
//      console.log("aaaaaaaaaa7" + location.data.status);
//   }

//   async locationDenied(getLocation) {
//     const { latitude, longitude } = getLocation.data.location;
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
//     );

//     this.locationAccepted(response);
//   }

//   componentDidMount() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async position => {
//           const { latitude, longitude } = position.coords;
//           const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
//           );
//           this.locationAccepted(response);
//         },
//         async error => {
//           const response = await axios.post(
//             `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`,
//           );
//          console.log("aaaaaaaaaa7 2");
//           this.locationDenied(response);
//         },
//       );
      
//     }
//   }





    createUser = () => {
        const user = Object.assign({}, this.state);
        axios.post('/api/users', user).then(({ data }) => {
            const { success, message } = data;
            if (success === true)
                NotificationManager.success(message, 'Success !', 6000);
            else
                NotificationManager.error(message, 'Sorry but...', 6000);
        })
        .catch(err => console.error('Error: ', err));
    }

    saveState = (name, value) => {
        this.setState({ [name]: value });
    }

    render() {
        return (
                <IndexLayout>
                    <RegisterForm
                        onSubmit={this.createUser}
                        onChange={this.saveState}
                    />
                </IndexLayout>
        );
    }

}
