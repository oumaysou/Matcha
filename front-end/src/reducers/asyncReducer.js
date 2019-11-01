import { REGISTER, GETALLMATCHES, USERNAMECLICKED } from '../constantes';

const initialeState = {
    clicked: false
}

const reducer = (state = initialeState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                register: action.data
            };
        case GETALLMATCHES:
            return {
                ...state,
                matches: action.data
            };
        case USERNAMECLICKED:
            // console.log("action =>" + JSON.stringify(state))
            return {
                ...state,
                usernameClicked: action.data,
                clicked: true

            };
        default: return state
    }
}

export default reducer