import { Card, Input, Form, Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import Style from "./ChangePassword.module.css"
import { LockOutlined } from '@ant-design/icons'
import { USERPLACEHOLDER, USER, GENERAL } from "../constants/appConstant"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import API from '../constants/apiConstant'
import { POST } from '../utils/apiFunction'
import { toastUtility } from '../utils/toast'
import { removeItem } from '../utils/localStorage'

const ChangePassword = () => {
    const User = useSelector((state) => state.User);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        previousPassword: "",
        password: "",
        cPassword: "",
    })
    const navigate = useNavigate();
    useEffect(() => {
        setFormData({ ...formData, email: User?.email })
    }, [User.email])

    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.CHANGE_PASSWORD}`, formData, true);
            setFormData({
                email:"",
                previousPassword: "",
                password: "",
                cPassword: "",
            })
            setIsModalOpen(true)
        } catch (error) {
            const message = error.response.data.message;
            toastUtility("error", message);
        }
        
    }
    function handleValueChange(e) {
        if (e.password) {
            setFormData({ ...formData, password: e.password })
        } else if (e.cPassword) {
            setFormData({ ...formData, cPassword: e.cPassword })
        } else if (e.previousPassword) {
            setFormData({ ...formData, previousPassword: e.previousPassword })
        }
    }

    async function handleOk() {
        setIsModalOpen(false);
        navigate("/dashboard");
    }

    function handleCancel() {
        removeItem("token");
        navigate("/login");
    }

    return (
        <div className={Style.cardContainer}>
            <Card
                title="Change Password"
                headStyle={{ backgroundColor: "black", color: "white" }}
                style={{
                    width: "400px",
                    height: "300px"
                }}
            >
                <Form onFinish={handleSubmit} onValuesChange={handleValueChange}>
                    <Form.Item
                        name="previousPassword"
                        rules={[{ required: true, message: USER.inputCurrentPassword }]}
                    >
                        <Input.Password placeholder={USERPLACEHOLDER.inputCurrentPassword} prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: USER.inputPassword }]}
                    >
                        <Input.Password placeholder={USERPLACEHOLDER.inputPassword} prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="cPassword"
                        rules={[{ required: true, message: USER.inputConfirmPassword }]}
                    >
                        <Input.Password placeholder={USERPLACEHOLDER.inputConfirmPassword} prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>Update Password</Button>
                    </Form.Item>
                </Form>
            </Card>
            {isModalOpen && <Modal
                title= {GENERAL.STAY_OR_LOGOUT}
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}

            ></Modal>}
        </div>
    )
}

export default ChangePassword