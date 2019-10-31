import { REGISTER, GETALL, USERNAMECLICKED } from '../constantes';

const initialeState_register = {
    clicked: false
}

// const initialeState_matches = {
//     data: [],
//     isLoading: false,
//     error: null,
// }

const reducer = (state = initialeState_register, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                state: action.data
            };
        case GETALL:
            return {
                ...state,
                state: action.data
            };
        case USERNAMECLICKED:
            // console.log("action =>" + JSON.stringify(state))
            return {
                ...state,
                usernameCLicked: action.data,
                clicked: true

            };
        default: return state
    }
}

export default reducer