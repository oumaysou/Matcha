import { REGISTER, GETALL } from '../constantes';

const initialeState_register = {

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
                // ...state,
                state: action.data
            };
        default: return state
    }
}

export default reducer