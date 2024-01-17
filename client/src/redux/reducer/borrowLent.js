const { BORROW_LENT_INFO } = require("../actionTypes/borrowLent")

const initialState = {
    data: []
}

function borrowLentReducer(state = initialState, action) {
    switch (action.type) {
        case BORROW_LENT_INFO:
            return {
                ...state,
                data: action.payload.data || state.data,
            };
        default: return state
    }
}

module.exports = borrowLentReducer;