import React, { useEffect } from 'react'
import Style from './NewPassword.module.css';
import { useState } from 'react';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate, NavLink } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { addItem, getItem, removeItem } from '../../utils/localStorage';
import InnerTitle from '../../components/General/InnerTitle';
import Input from '../../components/General/Input';
import Button from '../../components/General/Button';

const NewPassword = () => {
  const [formData, setFormData] = useState({
    email: getItem("email"),
    password: "",
    cPassword: "",
    otp: getItem("verifyCode")
  })
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const data = await POST(`${API.BASEURL}${API.RESET_PASSWORD}`, formData);
      toastUtility("success", data.data.message);
      removeItem("code");
      removeItem("email");
      removeItem("verifyCode");
      navigate("/login");

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

  function disabledButton() {
    if (formData.password.length > 0 && formData.cPassword.length > 0) {
      return false;
    }
    return true;
  }


  function handleEnterKey(event) {
    const isDisabled = disabledButton()
    if (isDisabled) return false;
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <InnerTitle title="Reset Password" />
        <Input
          type='password'
          name='password'
          placeholder={USERPLACEHOLDER.inputPassword}
          value={formData.password}
          onChange={handleValueChange}
        />
        <Input
          type='password'
          name='cPassword'
          placeholder={USERPLACEHOLDER.inputConfirmPassword}
          value={formData.confirmPassword}
          onChange={handleValueChange}
          onkeydown={handleEnterKey}
        />
        <Button
          onClick={handleSubmit}
          disabled={disabledButton()}
        />
      </div>
    </div>
  )
}

export default NewPassword