import { jwtDecode } from "jwt-decode";
import { getItem } from "../../utils/localStorage";
import { USER_INFO, } from "../actionTypes/user"
import { GET } from "../../utils/apiFunction";
import API from "../../constants/apiConstant"

export function userDetails(data) {
    const token = getItem("token");
    const decodedData = jwtDecode(token)
    return async function (dispatch, getState) {
        const user = await GET(`${API.BASEURL}${API.SINGLE_USER}/${decodedData.id}`, true);
        dispatch({ type: USER_INFO, payload: { ...user.data.data, id: user.data.data._id } })
    }
}