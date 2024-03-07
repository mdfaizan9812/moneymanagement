import React, { useEffect } from 'react'
import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import Style from './MoreInfo.module.css';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import { MailOutlined, LockOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import { GENERAL, USER, USERPLACEHOLDER } from "../../constants/appConstant"
import API from "../../constants/apiConstant"
import { toastUtility } from "../../utils/toast"
import { useNavigate, NavLink } from 'react-router-dom';
import { POST } from "../../utils/apiFunction"
import { getItem } from '../../utils/localStorage';
import { jwtDecode } from "jwt-decode"
import { userDetails } from '../../redux/action/user';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select


const MoreInfo = () => {
    const User = useSelector((state) => state.User);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        gender: "male",
        phoneNumber: "",
        dob: "",
    })
    const [iconData, setIconData] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getItem("isFirstLogin")) {
            navigate("/dashboard");
        }
    }, [])

    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.MOREINFO}`, formData, true);
            if (data.status === 200 && iconData) {
                const token = getItem("token");
                const decodedData = jwtDecode(token)
                const formDataIcon = new FormData()
                formDataIcon.append('file', iconData);
                formDataIcon.append('email', decodedData.email)
                formDataIcon.append('code', "registration")
                const dataIcon = await POST(`${API.BASEURL}${API.UPLOAD_ICON}`, formDataIcon, true)
                setIconData(null)
            }
            toastUtility("success", data.data.message);
            setFormData({
                gender: "male",
                phoneNumber: "",
                dob: "",
            });
            form.resetFields();
            navigate("/dashboard")
        } catch (error) {
            const message = error.response.data.message;
            toastUtility("error", message);
        }
    }

    function handleValueChange(e) {
        if (e.gender) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    gender: e.gender
                }
            })
        }
        if (e.phoneNumber) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    phoneNumber: e.phoneNumber
                }
            })
        }
        if (e.dob) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    dob: e.dob
                }
            })
        }
    }
    function handleUpload({ file, onSuccess, onError }) {
        setIconData(file);
        if (file.type.split('/')[0] === 'image') {
            onSuccess("Uploaded");
        }
        else {
            onError("Only image is allowed");
        }
    }
    function handleIconRemove(file) {
        if (file) {
            setIconData(null);
        }
    }
    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <AppHeader title={GENERAL.MOREINFORMATIONS} />
                <div className={Style.formContainer}>
                    <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
                        <Form.Item
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: USER.inputGender
                                },
                            ]}
                        >
                            <Select
                                placeholder={USERPLACEHOLDER.inputGender}
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: USER.inputPhoneNumber,
                                },
                                {
                                    pattern: /^\d{10}$/,
                                    message: USER.inputValidPhoneNumber,
                                },
                            ]}
                        >
                            <Input
                                prefix={<PhoneOutlined />}
                                placeholder={USERPLACEHOLDER.inputPhoneNumber}
                            />
                        </Form.Item>
                        <Form.Item
                            name="dob"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: USER.inputDOB
                                    }

                                ]
                            }
                        >
                            <DatePicker
                                getPopupContainer={(trigger) => trigger.parentElement}
                                placeholder={USERPLACEHOLDER.inputDOB}
                                format="DD/MM/YYYY"
                                showTime={true}
                                showNow={false}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="icon"
                        >
                            <Upload
                                customRequest={handleUpload}
                                onRemove={handleIconRemove}

                            >
                                <Button icon={<UploadOutlined />} disabled={iconData !== null ? true : false}>Upload</Button>
                            </Upload>
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

export default MoreInfo