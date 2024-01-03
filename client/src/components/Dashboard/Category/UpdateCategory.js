import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { CATEGORY, CATEGORYPLACEHOLDER } from '../../../constants/appConstant'
import { TagsOutlined } from '@ant-design/icons'
import API from '../../../constants/apiConstant'
import { PATCH } from '../../../utils/apiFunction'
import { toastUtility } from '../../../utils/toast'
import { categoryDetails } from '../../../redux/action/category'
import { useDispatch } from 'react-redux'

const UpdateCategory = ({ setIsUpdateModalOpen, isUpdateModalOpen, currentRecord, setCurrentRecord }) => {
    const [formData, setFormData] = useState({
        name: currentRecord?.name,
        description: currentRecord?.description
    })
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    async function handleSubmit() {
        try {
            const data = await PATCH(`${API.BASEURL}${API.UPDATE_CATEGORY}/${currentRecord?._id}`, formData, true);
            toastUtility("success", data.data.message);
            handleCancel()
            dispatch(categoryDetails())
            setCurrentRecord({});
        } catch (error) {
            const message = error.response.data.message
            toastUtility("error", message)
        }
    }

    function handleValueChange(e) {
        if (e.name) {
            setFormData({ ...formData, name: e.name })
        } else if (e.description) {
            setFormData({ ...formData, description: e.description })
        }
    }

    function handleCancel() {
        setIsUpdateModalOpen(false)
        setCurrentRecord({});
    }
    return (
        <>
            <Modal
                title={<p style={{ width: "90%", marginTop: "-3px" }}>Update Category</p>}
                open={isUpdateModalOpen}
                onCancel={handleCancel}
                centered={true}
                style={{ padding: "10px" }}
                footer={
                    [
                        <Button onClick={handleCancel}>Cancel</Button>,
                        <Button type="primary" onClick={() => form.submit()}>Update</Button>
                    ]
                }
            >
                <div style={{ marginTop: "30px" }}>
                    <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: CATEGORY.inputName }]}
                            initialValue={currentRecord?.name}
                        >
                            <Input placeholder={CATEGORYPLACEHOLDER.inputName} prefix={<TagsOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: CATEGORY.inputDescription }]}
                            initialValue={currentRecord?.description}
                        >
                            <Input.TextArea rows={4} placeholder={CATEGORYPLACEHOLDER.inputDescription} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

        </>
    )
}

export default UpdateCategory