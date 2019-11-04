import { REGISTER, GETALLMATCHES, USERNAMECLICKED, GETMESSAGES } from '../constantes';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';


export const register = (data) => {
    return {
        type: REGISTER,
        data
    };
};

export const getallMatches = (data) => {
    return {
        type: GETALLMATCHES,
        data
    };
};

export const getMessages = (data) => {
    return {
        type: GETMESSAGES,
        data
    };
};


export const usernameclicked = (data) => {
    return {
        type: USERNAMECLICKED,
        data
    };
};

// ACTION FOR REGISTER

export const thunk_register = (register) => {
    return function (dispatch) {
        return axios.post('/api/users', register).then(({ data }) => {
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

// ACTION FOR GETALL MATCHES

export const thunk_getallMatches = () => {
    return function (dispatch) {
        return axios.get(`api/matches/getall`).then(({ data }) => {
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
        return axios.get(`api/messages/getall`, users).then(({ data }) => {
            if (data.success) {
                dispatch(getallMatches(data.matches));
            }
        })
    };
};