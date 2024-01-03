import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { EXPENSE, EXPENSEPLACEHOLDER } from '../../../constants/appConstant'
import { TagsOutlined } from '@ant-design/icons'
import API from '../../../constants/apiConstant'
import { PATCH } from '../../../utils/apiFunction'
import { toastUtility } from '../../../utils/toast'
import { expenseDetails } from '../../../redux/action/expense'
import { useDispatch, useSelector } from 'react-redux'
const { Option } = Select

const UpdateExpense = ({ setIsUpdateModalOpen, isUpdateModalOpen, currentRecord, setCurrentRecord, page, limit, month }) => {
    const Category = useSelector((state) => state.Category);
    const [formData, setFormData] = useState({});
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    async function handleSubmit() {
        try {
            const data = await PATCH(`${API.BASEURL}${API.UPDATE_EXPENSE}/${currentRecord?._id}`, formData, true);
            toastUtility("success", data.data.message);
            handleCancel()
            dispatch(expenseDetails(page, limit, month.split("-")[1], month.split("-")[0]));
            setCurrentRecord({});
        } catch (error) {
            const message = error.response.data.message
            toastUtility("error", message)
        }
    }

    function handleValueChange(e) {
        if (e.productName) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    productName: e.productName
                }
            })
        } else if (e.categoryId) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    categoryId: e.categoryId
                }
            })
        } else if (e.date) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    date: e.date
                }
            })
        } else if (e.paymentMethod) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    paymentMethod: e.paymentMethod
                }
            })
        } else if (e.cost) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    cost: e.cost
                }
            })
        } else if (e.note) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    note: e.note
                }
            })
        }
    }
    function handleCancel() {
        setIsUpdateModalOpen(false)
        setCurrentRecord({});
    }
    console.log(formData);
    return (
        <>
            <Modal
                title={<p style={{ width: "90%", marginTop: "-3px" }}>Update Expense</p>}
                open={isUpdateModalOpen}
                onOk={() => { }}
                onCancel={handleCancel}
                centered={true}
                style={{ padding: "10px" }}
                footer={
                    [
                        <Button onClick={handleCancel}>Cancel</Button>,
                        <Button type="primary" onClick={() => form.submit()}>Add</Button>
                    ]
                }
            >
                <div style={{ marginTop: "10px" }}>
                    <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
                        <Form.Item
                            name="productName"
                            rules={[{ message: EXPENSE.inputProductName }]}
                            initialValue={currentRecord.productName}
                        >
                            <Input placeholder={EXPENSEPLACEHOLDER.inputProductName} prefix={<TagsOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="categoryId"
                            rules={[{message: EXPENSE.inputCategory }]}
                            initialValue={currentRecord.categoryId}
                        >
                            <Select defaultValue="None">
                                <Option value={""} disabled={true} key={0}>None</Option>
                                {
                                    Category?.data?.length > 0 && Category.data.map((category, index) => {
                                        return <Option value={category._id} key={index + 1} >{category.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="date"
                            // initialValue={moment(currentRecord.date).format('DD/MM/YYYY')}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD/MM/YYYY"
                                placeholder="Select Date"
                                showNow={false}
                            />
                        </Form.Item>
                        <Form.Item
                            name="paymentMethod"
                            initialValue={currentRecord.paymentMethod}
                        >
                            <Select defaultValue="cash">
                                <Option value={"cash"}>CASH</Option>
                                <Option value={"upi"}>UPI</Option>
                                <Option value={"card"}>CARD</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="cost"
                            initialValue={currentRecord.cost}
                        >
                            <Input placeholder={EXPENSEPLACEHOLDER.inputCash} prefix={<TagsOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="note"
                            initialValue={currentRecord.note}
                        >
                            <Input.TextArea rows={4} placeholder={EXPENSEPLACEHOLDER.inputNote} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default UpdateExpense