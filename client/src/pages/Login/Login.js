import React, { useState } from 'react'
import Style from './Login.module.css';
import { USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate, NavLink } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { addItem } from '../../utils/localStorage';
import InnerTitle from "../../components/General/InnerTitle"
import Input from "../../components/General/Input"
import Button from "../../components/General/Button"


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const data = await POST(`${API.BASEURL}${API.LOGIN}`, formData);
      toastUtility("success", data.data.message);
      setFormData({
        email: "",
        password: "",
      });

      addItem("token", data.data.token)
      navigate("/dashboard");
    } catch (error) {
      const message = error.response.data.message;
      toastUtility("error", message);
    }
  }

  function handleValueChange(e) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <InnerTitle title="Login" />
        <Input
          type='text'
          name='email'
          placeholder={USERPLACEHOLDER.inputEmail}
          value={formData.email}
          onChange={handleValueChange}
        />
        <Input
          type='password'
          name='password'
          placeholder={USERPLACEHOLDER.inputPassword}
          value={formData.password}
          onChange={handleValueChange}
        />
        <Button
          onClick={handleSubmit}
        />
        <div className={Style.signupForgetContainer}>
          <div className={Style.signupForgetInnerContainer}>
            <div><NavLink to={"/reset/password"} className={Style.Navlink}>Forget</NavLink></div>
            <div><NavLink to={"/register"} className={Style.Navlink}>Signup</NavLink></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login