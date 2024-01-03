const { EXPENSE_INFO } = require("../actionTypes/expense")

const initialState = {
    data: [],
    currentPage: 1,
    maxPage: 1,
    prevPage: 1,
    total: 0
}

function expenseReducer(state = initialState, action) {
    switch (action.type) {
        case EXPENSE_INFO:
            return {
                ...state,
                data: action.payload.data || state.data,
                currentPage: action.payload.currentPage || state.currentPage,
                maxPage: action.payload.maxPage || state.maxPage,
                prevPage: action.payload.prevPage || state.prev,
                total: action.payload.total || state.total
            };
        default: return state
    }
}

module.exports = expenseReducer;