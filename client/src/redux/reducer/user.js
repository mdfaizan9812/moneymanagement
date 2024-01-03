const { USER_INFO, SUCCESS, ERROR } = require("../actionTypes/user")

const initialState = {
    dob: "",
    email: "",
    gender: "",
    image: "",
    phoneNumber: "",
    role: "",
    username: "",
    id: "",
    success: false,
    error: false

}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                dob: action.payload.dob || state.dob,
                email: action.payload.email || state.email,
                gender: action.payload.gender || state.gender,
                image: action.payload.image || state.image,
                phoneNumber: action.payload.phoneNumber || state.phoneNumber,
                role: action.payload.role || state.role,
                username: action.payload.username || state.username,
                id: action.payload.id || state.id,
            };
        default: return state
    }
}

module.exports = userReducer;