import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import Style from './VerifyOTP.module.css';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { POST } from '../../utils/apiFunction';
import { addItem, getItem } from '../../utils/localStorage';

const VerifyOTP = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        otp: "",
        email: "",
        code: ""
    });
    const [resend, setResend] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (getItem("token")) {
            navigate("/dashboard");
            return
        }

        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        if ((!email || getItem("isVerified") === "true" || typeof getItem("isVerified") === "object") && typeof getItem("code") === "string") {
            navigate("/login")
            return;
        }

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                email,
                code: getItem("code")
            }
        });
    }, [location.search])

    useEffect(() => {
        setTimeout(() => {
            setResend(true)
        }, 2000)
    }, [])


    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.VERIFY_ACCOUNT}`, formData);
            toastUtility("success", data.data.message);
            addItem("isVerified", true)
            if (getItem("code") === "resetpassword") {
                addItem("verifyCode", formData.otp)
                navigate(`/reset/password/new?email=${formData.email}`)
            } else if (getItem("code") === "registration") {
                navigate("/login")
            }
        } catch (error) {
            const message = error.response.data.message;
            toastUtility("error", message);
        }
    }
    function handleValueChange(e) {
        if (e.otp) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    otp: e.otp
                }
            })
        }
    }

    async function resendOTP() {
        try {
            if (!resend) {
                toastUtility("error", GENERAL.RESEND_OTP);
                return;
            }
            const data = await POST(`${API.BASEURL}${API.RESEND_OTP}?code=${getItem("code")}`, { email: formData?.email });
            toastUtility("success", data.data.message);
            setResend(false)
            setTimeout(() => {
                setResend(true)
            }, 2000)
        } catch (error) {
            const message = error.response.data.message;
            toastUtility("error", message);
        }
    }
    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <AppHeader title={GENERAL.VERIFY_OTP} />
                <div className={Style.formContainer}>
                    <Form onFinish={handleSubmit} onValuesChange={handleValueChange}>
                        <Form.Item
                            name="otp"
                            rules={[{ required: true, message: USER.inputOTP }]}
                            initialValue={formData.username}
                        >
                            <Input placeholder={USERPLACEHOLDER.inputOTP} prefix={<SafetyCertificateOutlined />} />
                        </Form.Item>
                        <div className={Style.buttons}>
                            <Form.Item>
                                <Button htmlType="submit" className={Style.button} style={{ backgroundColor: "#4CAF50", color: "white" }}>Verify</Button>
                            </Form.Item>
                            <span className={Style.forgetLink} onClick={resendOTP}>Resend</span>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP