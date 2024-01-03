const API = {
    BASEURL: "http://localhost:5000",
    REGISTRATION: "/api/v1/user/register",
    VERIFY_ACCOUNT: "/api/v1/user/verify",
    RESEND_OTP: "/api/v1/user/sendOTP",
    LOGIN: "/api/v1/user/login",
    MOREINFO: "/api/v1/user/moreinfo",
    SEND_OTP: "/api/v1/user/sendOTP",
    RESET_PASSWORD: "/api/v1/user/forgetPassword",
    UPLOAD_ICON: "/api/v1/asset/create",
    SINGLE_USER: "/api/v1/user",
    CHANGE_PASSWORD: "/api/v1/user/changePassword",
    ADD_CATEGORY: "/api/v1/category/create",
    GET_All_CATEGORY: "/api/v1/category",
    UPDATE_CATEGORY: "/api/v1/category",
    DELETE_CATEGORY: "/api/v1/category",
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense",
    UPDATE_EXPENSE: "/api/v1/expense",
    DELETE_EXPENSE: "/api/v1/expense",
}

module.exports = API;