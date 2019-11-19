import { REGISTER, SIGNIN, GETALLMATCHES, USERNAMECLICKED } from '../constantes';

const initialeState = {
    clicked: false,
    username: ""
}

const reducer = (state = initialeState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                register: action.data
            };
        case SIGNIN:
            return {
                ...state,
                connected: true,
                username: action.data.username
            };
        case GETALLMATCHES:
            return {
                ...state,
                matches: action.data
            };
        case USERNAMECLICKED:
            return {
                ...state,
                usernameClicked: action.data,
                clicked: true

            };
        default: return state
    }
}

export default reducer