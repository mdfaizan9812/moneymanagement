import { BORROW_LENT_INFO } from "../actionTypes/borrowLent"
import { GET } from "../../utils/apiFunction";
import API from "../../constants/apiConstant"

export function borrowLentDetails() {
    return async function (dispatch, getState) {
        const data = await GET(`${API.BASEURL}${API.GET_ALL_BORROW_LENT}?type=all`, true);
        dispatch({ type: BORROW_LENT_INFO, payload: { data: data.data.data } })
    }
}