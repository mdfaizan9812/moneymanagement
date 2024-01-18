import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import Style from './NewPassword.module.css';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useLocation } from 'react-router-dom';
import { useNavigate, NavLink } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { addItem, getItem } from '../../utils/localStorage';

const NewPassword = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cPassword: "",
    otp: getItem("verifyCode")
  })
  const navigate = useNavigate();
  useEffect(() => {
    if (getItem("token")) {
      navigate("/dashboard");
    }

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    if (!email) {
      navigate("/login")
      return;
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        email
      }
    });
  }, [])

  async function handleSubmit() {
    try {
      const data = await POST(`${API.BASEURL}${API.RESET_PASSWORD}`, formData);
      toastUtility("success", data.data.message);
      navigate("/login");

    } catch (error) {
      const message = error.response.data.message;
      toastUtility("error", message);
    }
  }

  function handleValueChange(e) {
    if (e.password) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          password: e.password
        }
      })
    }
    if (e.confirmPassword) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          cPassword: e.confirmPassword
        }
      })
    }
  }

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <AppHeader title={GENERAL.RESET_PASSWORD} />
        <div className={Style.formContainer}>
          <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: USER.inputPassword }]}
              initialValue={formData.password}
            >
              <Input.Password placeholder={USERPLACEHOLDER.inputPassword} prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: USER.inputConfirmPassword }]}
              initialValue={formData.password}
            >
              <Input.Password placeholder={USERPLACEHOLDER.inputConfirmPassword} prefix={<LockOutlined />} />
            </Form.Item>
            <div className={Style.buttons}>
              <Form.Item>
                <Button htmlType="submit" className={Style.button} style={{ backgroundColor: "#4CAF50", color: "white" }}>Submit</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default NewPassword