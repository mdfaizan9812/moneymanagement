import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import Style from './Register.module.css';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate, NavLink } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { addItem, getItem } from '../../utils/localStorage';

const Register = () => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    useEffect(() => {
        if (getItem("token")) {
            navigate("/dashboard");
        }
    }, [])

    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.REGISTRATION}`, formData);
            toastUtility("success", data.data.message);
            setFormData({
                username: "",
                email: "",
                password: "",
            });
            addItem("isVerified", false);
            addItem("code", "registration");
            navigate(`/verify?email=${formData.email}`);
        } catch (error) {
            const message = error.response.data.message;
            toastUtility("error", message);
        }
    }

    function handleValueChange(e) {
        if (e.username) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    username: e.username
                }
            })
        }
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
                <AppHeader title={GENERAL.REGISTRATION} />
                <div className={Style.formContainer}>
                    <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: USER.inputUsername }]}
                            initialValue={formData.username}
                        >
                            <Input placeholder={USERPLACEHOLDER.inputUsername} prefix={<UserOutlined />} />
                        </Form.Item>
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
                        </div>
                        <span>Do you have account <NavLink to="/login">Sign in</NavLink> </span>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register