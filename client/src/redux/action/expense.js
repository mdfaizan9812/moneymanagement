import { EXPENSE_INFO } from "../actionTypes/expense"
import { GET } from "../../utils/apiFunction";
import API from "../../constants/apiConstant"

export function expenseDetails(page = 1, limit = 5, month, year) {
    return async function (dispatch, getState) {
        const expense = await GET(`${API.BASEURL}${API.GET_ALL_EXPENSE}?page=${page}&limit=${limit}&month=${month}&year=${year}`, true);
        dispatch({
            type: EXPENSE_INFO,
            payload: {
                data: expense.data.data.allExpenses.expenses,
                currentPage: expense.data.data.currentPage,
                maxPage: expense.data.data.maxPage,
                prevPage: expense.data.data.prevPage,
                total: expense.data.data.total
            }
        })
    }
}