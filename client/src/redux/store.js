import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducer/user";
import { thunk } from "redux-thunk"
import categoryReducer from "./reducer/category";
import expenseReducer from "./reducer/expense";

const rootReducer = combineReducers({
    User: userReducer,
    Category: categoryReducer,
    Expense: expenseReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;