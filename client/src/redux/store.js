import userSlice from "./reducer/user";
import categoryReducer from "./reducer/category";
import expenseReducer from "./reducer/expense";
import borrowLentReducer from "./reducer/borrowLent";

import {configureStore} from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        User: userSlice,
        Category: categoryReducer,
        Expense: expenseReducer,
        BorrowLent: borrowLentReducer
    }
})

export default store;