import React, { useState } from 'react'
import Style from './Register.module.css';
import { USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate, NavLink } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { addItem } from '../../utils/localStorage';
import InnerTitle from '../../components/General/InnerTitle';
import Input from '../../components/General/Input';
import Button from '../../components/General/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate();

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
                <InnerTitle title="Registration" />
                <Input
                    type='text'
                    name='username'
                    placeholder={USERPLACEHOLDER.inputUsername}
                    value={formData.username}
                    onChange={handleValueChange}
                />
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
                <div className={Style.loginContainer}>
                    <div className={Style.loginInnerContainer}>
                        <div><NavLink to={"/login"} className={Style.Navlink}>Login</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register