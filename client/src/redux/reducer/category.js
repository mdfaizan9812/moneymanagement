const { CATEGORY_INFO } = require("../actionTypes/category")

const initialState = {
    data: []
}

function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case CATEGORY_INFO:
            return {
                ...state,
                data: action.payload.data || state.data,
            };
        default: return state
    }
}

module.exports = categoryReducer;