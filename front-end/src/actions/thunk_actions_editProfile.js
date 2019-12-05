import { GETINFOSUSER, EDITUSER, SAVEPICTURES, DELPICTURE, SAVEAVATAR, GETALLTAGS } from '../constantes';
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

export const savePicturesUser = (data) => {
    return {
        type: SAVEPICTURES,
        data: data
    };
};

export const delPictureUser = (data) => {
    return {
        type: DELPICTURE,
        data: data
    };
};

export const saveAvatarUser = (data) => {
    return {
        type: SAVEAVATAR,
        data: data
    };
};

export const getAllTags = (data) => {
    return {
        type: GETALLTAGS,
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

// ACTION FOR EDIT INFOS USER

export const thunk_editInfosUser = (userData) => {
    return function (dispatch) {
        return axios.post('/api/update', userData).then(({ data }) => {
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

// ACTION FOR SAVE PICTURES USER

export const thunk_savePicturesUser = (userData) => {   
    return function (dispatch) {
        return axios.post('/api/pictures', userData).then(({ data }) => {
            const { success, message } = data;
            if (success) {
                dispatch(savePicturesUser(data));
                window.location.reload();
            }
            else
                NotificationManager.error(message, 'Sorry but...', 3000);
        }).catch(err => console.error('Error: ', err))
        };
};

// ACTION FOR SAVE AVATAR USER

export const thunk_saveAvatarUser = (userData, oldPath) => {
    return function (dispatch) {
        return axios.post('/api/avatar', userData).then(({ data }) => {
            const { success, message } = data;
            if (success) {
                axios.post('/api/delavatar', oldPath)
                .catch(err => console.error('Error: ', err))
            }
            else
                NotificationManager.error(message, 'Sorry but...', 3000);
        }).catch(err => console.error('Error: ', err))
        };
};

// // ACTION FOR DEL PICTURE USER

export const thunk_delPictureUser = (picture) => {
    let pic =  {
        path: picture
    }
    return function (dispatch) {
        return axios.post(`/api/delpicture`, pic).then(({ data }) => {
            const { success, message } = data;
            if (success) {
                dispatch(delPictureUser(data));
                window.location.reload();
            }
            else
                NotificationManager.error(message, 'Sorry but...', 3000);
            }).catch(err => console.error('Error: ', err));
    };
};

// ACTION FOR GET ALL TAGS

export const thunk_getAllTags = () => {
    return function (dispatch) {
        return axios.get(`/api/tagslist`).then(({ data }) => {
            if (data.success) {
                dispatch(getAllTags(data));
            }
        })
    };
};