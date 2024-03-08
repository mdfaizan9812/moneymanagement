import { getItem } from "./utils/localStorage";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerifyOTP from "./pages/VerifyOTP/VerifyOTP";
import MoreInfo from "./pages/MoreInfo/MoreInfo";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewPassword from "./pages/ForgetPassword/NewPassword";
import ChangePassword from "./components/ChangePassword";
import Visual from "./components/Dashboard/Visual/Visual";
import Category from "./components/Dashboard/Category/Category";
import Expense from "./components/Dashboard/Expense/Expense";
import Budget from "./components/Dashboard/Budget/Budget";
import BorrowLent from "./components/Dashboard/BorrowLent/BorrowLent";
import User from "./components/Dashboard/User/User";
import Register from "./pages/Register/Register";
const isToken = getItem("token")

export const routes = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: isToken ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />
      },
      {
        path: "/login",
        element: isToken ? <Navigate to={"/dashboard"} /> : <Login />
      },
      {
        path: "/register",
        element: isToken ? <Navigate to={"/dashboard"} /> : <Register />
      },
      {
        path: "/verify",
        element: isToken ? <Navigate to={"/dashboard"} /> : <VerifyOTP />
      },
      {
        path: "/moreinfo",
        element: isToken ? <MoreInfo />: <Navigate to={"/login"}/>,
      },
      {
        path: "sendOTP",
        element: isToken ? <Navigate to={"/dashboard"} /> : <ForgetPassword />
      },
      {
        path: "/reset/password",
        element: isToken ? <Navigate to={"/dashboard"} /> : <NewPassword />
      },
      {
        path: "/dashboard",
        element: !isToken ? <Navigate to={"/login"} /> : <Dashboard />,
        children: [
          {
            path: "",
            element: <Visual />
          },
          {
            path: "expense",
            element: <Expense />
          },
          {
            path: "category",
            element: <Category />
          },
          {
            path: "budget",
            element: <Budget />
          },
          {
            path: "borrowlent",
            element: <BorrowLent />
          },
          {
            path: "user",
            element: <User />
          },
          {
            path: "change/password",
            element: <ChangePassword />
          },
        ]
      }
    ]
  }
])
