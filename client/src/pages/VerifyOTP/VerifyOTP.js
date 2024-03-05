import React, { useEffect } from 'react'
import Style from './VerifyOTP.module.css';
import { useState } from 'react';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { POST } from '../../utils/apiFunction';
import { addItem, getItem } from '../../utils/localStorage';
import InnerTitle from '../../components/General/InnerTitle';
import Button from '../../components/General/Button';
import Input from '../../components/General/Input';
import { isRegistration } from '../../utils/global';

const VerifyOTP = () => {
    const [formData, setFormData] = useState({
        otp: "",
        email: "",
        code: ""
    });
    const [resend, setResend] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                email: getItem("email"),
                code: getItem("code")
            }
        });
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setResend(true)
        }, 2000)
    }, [])


    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.VERIFY_ACCOUNT}`, formData);
            toastUtility("success", data.data.message);
            if (getItem("code") === "resetpassword") {
                addItem("verifyCode", formData.otp)
                navigate(`/reset/password`)
            } else if (getItem("code") === "registration") {
                navigate("/login")
            }
        } catch (error) {
            const message = error.response.data.message;
            toastUtility("error", message);
        }
    }
    function handleValueChange(e) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                otp: e.target.value
            }
        })
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

    function disabledButton() {
        if (formData.otp.length > 0) {
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
                <InnerTitle title="Verify registration" />
                <Input
                    type='text'
                    name='otp'
                    placeholder={USERPLACEHOLDER.inputOTP}
                    value={formData.otp}
                    onChange={handleValueChange}
                    onkeydown={handleEnterKey}
                />
                <Button
                    onClick={handleSubmit}
                    disabled={disabledButton()}
                />
                <div className={Style.verifyContainer}>
                    <div className={Style.verifyInnerContainer}>
                        <button onClick={resendOTP} className={Style.verifyButton}>Resend</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP