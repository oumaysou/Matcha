// import store from '../store/store';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export const register = data => {
    return {
        type: "REGISTER",
        data: data
    };
};

export const receive_error = () => {
    return {
        type: "RECEIVE_ERROR"
    };
};

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
                dispatch(register(data));
            }
        })
            .catch(err => console.error('Error: ', err));
    };
};