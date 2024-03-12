import React, { useEffect } from 'react'
import Style from './MoreInfo.module.css';
import { useState } from 'react';
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { NavLink, useNavigate } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { addItem, getItem } from '../../utils/localStorage';
import InnerTitle from '../../components/General/InnerTitle';
import Select from '../../components/General/Select';
import Input from '../../components/General/Input';
import { USERPLACEHOLDER } from '../../constants/appConstant';
import Button from '../../components/General/Button';


const MoreInfo = () => {
    const [formData, setFormData] = useState({
        gender: "male",
        phoneNumber: "",
        dob: "",
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (!getItem("isFirstLogin")) {
            navigate("/dashboard");
        }
    }, [])

    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.MOREINFO}`, formData, true);
            toastUtility("success", data.data.message);
            setFormData({
                gender: "male",
                phoneNumber: "",
                dob: "",
            });
            addItem("isFirstLogin", false);
            navigate("/dashboard")
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

    const selectData = [
        {
            title: 'Male',
            value: 'male'
        },
        {
            title: 'Female',
            value: 'female'
        },
        {
            title: 'Other',
            value: 'other'
        },
    ]
    function disabledButton() {
        if (formData.gender.length > 0 && formData.phoneNumber.length > 0 && formData.dob.length > 0) {
            return false;
        }
        return true;
    }
    
    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <InnerTitle title="MoreInfo" />
                <Select 
                    data = {selectData}
                    onChange={handleValueChange}
                    name="gender"
                />
                <Input
                    type='text'
                    name='phoneNumber'
                    placeholder={USERPLACEHOLDER.inputPhoneNumber}
                    value={formData.phoneNumber}
                    onChange={handleValueChange}
                />
                <Input
                    type='date'
                    name='dob'
                    placeholder={USERPLACEHOLDER.inputDOB}
                    value={formData.dob}
                    onChange={handleValueChange}
                />
                <Button
                    onClick={handleSubmit}
                    disabled={disabledButton()}
                />
                <div className={Style.skipContainer}>
                    <div className={Style.skip}><NavLink to={"/dashboard"} className={Style.Navlink}>Skip</NavLink></div>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo