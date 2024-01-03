import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import Style from './Login.module.css';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate, NavLink } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { addItem, getItem, removeItem } from '../../utils/localStorage';

const Login = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  useEffect(() => {
    if (getItem("token")) {
      navigate("/dashboard");
    }
    removeItem("code");
    removeItem("verifyCode");
    removeItem("isVerified");
  }, [])

  async function handleSubmit() {
    console.log("handle submit", formData);
    try {
      const data = await POST(`${API.BASEURL}${API.LOGIN}`, formData);
      toastUtility("success", data.data.message);
      setFormData({
        email: "",
        password: "",
      });

      addItem("token", data.data.token)
      const fetchedData = data.data.data
      if (!(fetchedData.phoneNumber || fetchedData.gender || fetchedData.dob)) {
        navigate("/moreinfo");
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      const message = error.response.data.message;
      toastUtility("error", message);
    }
  }

  function handleValueChange(e) {
    if (e.email) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          email: e.email
        }
      })
    }
    if (e.password) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          password: e.password
        }
      })
    }
  }

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <AppHeader title={GENERAL.LOGIN} />
        <div className={Style.formContainer}>
          <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: USER.inputEmail }]}
              initialValue={formData.email}
            >
              <Input placeholder={USERPLACEHOLDER.inputEmail} prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: USER.inputPassword }]}
              initialValue={formData.password}
            >
              <Input.Password placeholder={USERPLACEHOLDER.inputPassword} prefix={<LockOutlined />} />
            </Form.Item>
            <div className={Style.buttons}>
              <Form.Item>
                <Button htmlType="submit" className={Style.button} style={{ backgroundColor: "#4CAF50", color: "white" }}>Submit</Button>
              </Form.Item>
              <span className={Style.forgetLink}> <NavLink to="/reset/password">Forget Password</NavLink> </span>
            </div>
            <span>You have no account <NavLink to="/register">Sign up</NavLink> </span>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login