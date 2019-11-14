import { GETINFOSUSER, EDITUSER, GETALLTAGS, GETUSERTAGS } from '../constantes';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
// import Cookies from 'universal-cookie';

export const getInfosUser = (data) => {
    return {
        type: GETINFOSUSER,
        data: data
    };
};

export const editInfosUser = (data) => {
    return {
        type: EDITUSER,
        data: data
    };
};

export const getAllTags = (data) => {
    return {
        type: GETALLTAGS,
        data: data
    };
};

export const getUserTags = (data) => {
    return {
        type: GETUSERTAGS,
        data: data
    };
};

// ACTION FOR GET INFOS USER

export const thunk_getInfosUser = (username) => {
    return function (dispatch) {
        return axios.get(`/api/users/profile/${username}`).then(({ data }) => {
            if (data.success) {
                dispatch(getInfosUser(data));
            }
        })
    };
};

// ACTION FOR EDIT USER

export const thunk_editInfosUser = (userData) => {
    console.log(userData);
    
    return function (dispatch) {
        axios.post('/api/update', userData).then(({ data }) => {
            const { success, message } = data;
            if (success) {
                dispatch(editInfosUser(data));
                NotificationManager.success(message, 'Success !', 3000);
            }
            else
                NotificationManager.error(message, 'Sorry but...', 3000);
        })
        .catch(err => console.error('Error: ', err));
    };
};

// ACTION FOR GET ALL TAGS

export const thunk_getAllTags = (username) => {
    return function (dispatch) {
        return axios.get(`/api/users/profile/${username}`).then(({ data }) => {
            if (data.success) {
                dispatch(getInfosUser(data));
            }
        })
    };
};

// ACTION FOR GET USER TAGS

export const thunk_getUserTags = (username) => {
    return function (dispatch) {
        return axios.get(`/api/users/profile/${username}`).then(({ data }) => {
            if (data.success) {
                dispatch(getInfosUser(data));
            }
        })
    };
};