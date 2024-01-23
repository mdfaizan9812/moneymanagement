import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { getItem } from "../../utils/localStorage";
import { GET } from "../../utils/apiFunction";
import API from "../../constants/apiConstant"

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

export const addInfo = createAsyncThunk("user/details", async() => {
    const token = getItem("token");
    const decodedData = jwtDecode(token)
    const user = await GET(`${API.BASEURL}${API.SINGLE_USER}/${decodedData.id}`, true);
    return user.data.data;
})


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
  
    },
    extraReducers: (builder)=>{
        builder.addCase(addInfo.fulfilled, (state, action) => {
            state.dob=action.payload.dob;
            state.email=action.payload.email;
            state.gender=action.payload.gender;
            state.image=action.payload.image;
            state.phoneNumber=action.payload.phoneNumber;
            state.role=action.payload.role;
            state.username=action.payload.username;
            state.id=action.payload._id;
        })
    }
})

export default userSlice.reducer;
// export const {addInfo} = userSlice.actions;