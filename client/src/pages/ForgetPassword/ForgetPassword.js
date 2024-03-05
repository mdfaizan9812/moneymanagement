import React, { useEffect } from 'react'
import Style from './ForgetPassword.module.css';
import { useState } from 'react';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate } from 'react-router-dom';
import { POST } from '../../utils/apiFunction';
import { addItem } from '../../utils/localStorage';
import InnerTitle from '../../components/General/InnerTitle';
import Button from '../../components/General/Button';
import Input from '../../components/General/Input';

const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
    });
    const navigate = useNavigate();


    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.SEND_OTP}`, formData);
            toastUtility("success", data.data.message);
            addItem("code", "resetpassword");
            addItem("email", formData.email);
            navigate(`/verify`)
        } catch (error) {
            const message = error.response.data.message;
            toastUtility("error", message);
        }
    }

    function handleValueChange(e) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                email: e.target.value
            }
        })
    }


    function disabledButton() {
        if (formData.email.length > 0) {
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
                <InnerTitle title="Send an OTP" />
                <Input
                    type='email'
                    name='email'
                    placeholder={USERPLACEHOLDER.inputEmail}
                    value={formData.email}
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

export default ForgetPassword