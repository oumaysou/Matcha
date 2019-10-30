import { REGISTER } from '../constantes';

const initialeState_register = {
    username: '',
    firstName: '',
    lastName: '',
    birthday: '',
    password: '',
    passwordCfm: '',
    gender: '',
    orientation: '',
    location: '',
}

const reducer = (state = initialeState_register, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                state: action.data
            };
        default: return state
    }
}

export default reducer