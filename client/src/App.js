import Register from "./pages/Register/Register";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/moreinfo" element={<MoreInfo />} />
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<Visual />} />
            <Route path="category" element={<Category />} />
            <Route path="expense" element={<Expense />} />
            <Route path="budget" element={<Budget />} />
            <Route path="borrowlent" element={< BorrowLent />} />
            <Route path="user" element={< User />} />
            <Route exact path="change/password" element={<ChangePassword />} />
          </Route>
          <Route exact path="/reset/password" element={<ForgetPassword />} />
          <Route exact path="/reset/password/new" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      </QueryClientProvider>
  );
}

export default App;
