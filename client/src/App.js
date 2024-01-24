import Register from "./pages/Register/Register";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import Error from "./pages/Error";

const throwError = ()=>{
  throw "Something went wrong";
}
const routes = createBrowserRouter([
  {
    errorElement: <Error/>,
    children:[
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/verify",
    element: <VerifyOTP />
  },
  {
    path: "/moreinfo",
    element: <MoreInfo />,
    // loader: Afunction     Afunction is a async function that return data after API call.(It may not be async function)
    // in moreinfo component we can use code like "const data = useLoaderData()",   data will be output of Afunction
  },
  {
    path: "/reset/password",
    element: <ForgetPassword />
  },
  {
    path: "/reset/password/new",
    element: <NewPassword />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
]}
])

function App() {
  return (
    <>
      <RouterProvider router={routes}/>
      <ToastContainer />
    </>
  );
}

export default App;
