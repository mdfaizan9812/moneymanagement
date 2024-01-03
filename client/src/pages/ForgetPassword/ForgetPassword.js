import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import Style from './ForgetPassword.module.css';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import { MailOutlined } from '@ant-design/icons';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { POST } from '../../utils/apiFunction';
import { addItem, getItem } from '../../utils/localStorage';

const ForgetPassword = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: "",
    });
    const [resend, setResend] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (getItem("token")) {
            navigate("/dashboard");
            return
        }
    })


    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.SEND_OTP}`, formData);
            toastUtility("success", data.data.message);
            addItem("isVerified", false);
            addItem("code", "resetpassword");
            navigate(`/verify?email=${formData.email}`)
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
    }
    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <AppHeader title={GENERAL.EMAIL_FOR_OTP} />
                <div className={Style.formContainer}>
                    <Form onFinish={handleSubmit} onValuesChange={handleValueChange}>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: USER.inputEmail }]}
                            initialValue={formData.username}
                        >
                            <Input placeholder={USERPLACEHOLDER.inputEmail} prefix={<MailOutlined />} />
                        </Form.Item>
                        <div className={Style.buttons}>
                            <Form.Item>
                                <Button htmlType="submit" className={Style.button} style={{ backgroundColor: "#4CAF50", color: "white" }}>Send</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword