import { CATEGORY_INFO } from "../actionTypes/category"
import { GET } from "../../utils/apiFunction";
import API from "../../constants/apiConstant"

export function categoryDetails() {
    return async function (dispatch, getState) {
        const category = await GET(`${API.BASEURL}${API.GET_All_CATEGORY}?`, true);
        dispatch({ type: CATEGORY_INFO, payload: { data: category.data.data } })
    }
}