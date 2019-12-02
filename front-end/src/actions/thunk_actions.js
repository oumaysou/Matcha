import { REGISTER, SIGNIN, GETALLMATCHES, USERNAMECLICKED } from '../constantes';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';


export const register = (data) => {
    return {
        type: REGISTER,
        data: data
    };
};

export const signIn = (data) => {
    return {
        type: SIGNIN,
        data: data
    };
};

export const getallMatches = (data) => {
    return {
        type: GETALLMATCHES,
        data: data
    };
};

// export const getMessages = (data) => {
//     return {
//         type: GETMESSAGES,
//         data
//     };
// };


export const usernameclicked = (data) => {
    return {
        type: USERNAMECLICKED,
        data: data
    };
};


// ACTION FOR REGISTER

export const thunk_register = (regis) => {
    return function (dispatch) {
        return axios.post('/api/users', regis).then(({ data }) => {
            const { success, message } = data;
            if (success === true) {
                dispatch(register(data));
                NotificationManager.success(message, 'Success !', 6000);
            }
            else {
                NotificationManager.error(message, 'Sorry but...', 6000);
            }
        })
            .catch(err => console.error('Error: ', err));
    };
};

// ACTION FOR SIGNIN

export const thunk_signIn = (dataSign) => {
    return function (dispatch) {
        return axios.post('/api/users/signin', dataSign).then(({ data }) => {
            const { success, message, userData } = data;
            // console.log("Data " + JSON.stringify(data))
            if (success === true) {
                dispatch(signIn(userData));
                const cookies = new Cookies();
                cookies.set('token', userData.token, { path: '/' });
            }
            else {
                NotificationManager.error(message, 'Sorry but...', 6000);
            }
        })
            .catch(err => console.error('Error: ', err));
    };
};

// ACTION FOR GETALL MATCHES

export const thunk_getallMatches = () => {
    return function (dispatch) {
        return axios.get(`/api/matches/getall`).then(({ data }) => {
            if (data.success) {
                dispatch(getallMatches(data.matches));
            }
        })
    };
};

// ACTION FOR USERNAMECLICKED - chat

export const thunk_usernameClicked = (usernameClicked) => {
    return function (dispatch) {
        dispatch(usernameclicked(usernameClicked));
    }
}

// ACTION FOR GET MESSAGES

export const thunk_getMessages = (users) => {
    return function (dispatch) {
        return axios.get(`/api/matches/getall`, users).then(({ data }) => {
            if (data.success) {
                dispatch(getallMatches(data.matches));
            }
        })
    };
};