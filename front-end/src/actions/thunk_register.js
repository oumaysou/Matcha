// import store from '../store/store';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';


export const register = data => {
    return {
        type: "REGISTER",
        data: data
    };
};

export const getall = (data) => {
    return {
        type: "GETALL",
        data: data
    };
};

export const usernameclicked = (data) => {
    return {
        type: "USERNAMECLICKED",
        data: data
    };
};

// ACTION FOR REGISTER

export const thunk_register = (state) => {
    // const userInfo = Object.assign({}, state);
    return function (dispatch, getState) {
        return axios.post('/api/users', state).then(({ data }) => {
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

// ACTION FOR GETALL MEMBERS

export const thunk_getall = (allMatches) => {
    return function (dispatch, getState) {
        return axios.get(`api/matches/getall`).then(({ data }) => {
            if (data.success) {
                dispatch(getall(data));

            }
        })
    };
};

// ACTION FOR USERNAMECLICKED - chat

export const thunk_usernameClicked = (usernameClicked) => {
    return function (dispatch, getState) {
        // const test = getState();
        dispatch(usernameclicked(usernameClicked));
    }
}