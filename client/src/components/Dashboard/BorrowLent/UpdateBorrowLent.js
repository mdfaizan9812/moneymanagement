import React, { useEffect, useState } from 'react'
import Style from "./BorrowLent.module.css"
import { Button, Input, Modal, Form, Table, Dropdown, Menu, Select, DatePicker } from 'antd'
import { BORROWLENTPLACEHOLDER, BORROWLENT } from '../../../constants/appConstant';
import API from '../../../constants/apiConstant';
import { TagsOutlined, MoreOutlined } from '@ant-design/icons';
import { DELETE, PATCH, POST } from '../../../utils/apiFunction';
import { toastUtility } from '../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { borrowLentDetails } from '../../../redux/action/borrowLent';
import AppAlert from '../AppAlert';
import moment from 'moment';
const { Option } = Select;


const UpdateBorrowLent = ({ setIsUpdateModalOpen, isUpdateModalOpen, currentRecord, setCurrentRecord }) => {

    const [formData, setFormData] = useState({
        personName: "",
        type: "",
        amount: "",
        typeDate: "",
        dueDate: "",
    })
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    async function handleSubmit() {
        try {
            const data = await PATCH(`${API.BASEURL}${API.UPDATE_BORROW_LENT}/${currentRecord?._id}`, formData, true);
            toastUtility("success", data.data.message);
            handleCancel()
            dispatch(borrowLentDetails())
            setCurrentRecord({});
        } catch (error) {
            const message = error.response.data.message
            toastUtility("error", message)
        }
    }

    function handleValueChange(e) {
        if (e.personName) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    personName: e.personName
                }
            })
        } else if (e.type) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    type: e.type
                }
            })
        }
        else if (e.amount) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    amount: e.amount
                }
            })
        } else if (e.typeDate) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    typeDate: e.typeDate.format("YYYY/MM/DD")
                }
            })
        } else if (e.dueDate) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    dueDate: e.dueDate.format("YYYY/MM/DD")
                }
            })
        }
    }

    function handleCancel() {
        setIsUpdateModalOpen(false)
        setCurrentRecord({});
    }

    return (
        <>
            {isUpdateModalOpen &&
                <Modal
                    title={<p style={{ width: "90%", marginTop: "-3px" }}>Update BorrowLent</p>}
                    open={isUpdateModalOpen}
                    onOk={() => { }}
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
                                name="personName"
                                initialValue={currentRecord?.personName}
                            >
                                <Input placeholder={BORROWLENTPLACEHOLDER.inputPersonName} prefix={<TagsOutlined />} />
                            </Form.Item>

                            <Form.Item
                                name="type"
                                initialValue={currentRecord?.type}
                            >
                                <Select defaultValue="None">
                                    <Option value={""} disabled={true} key={0}>None</Option>
                                    <Option value={"borrow"} key={1}>Borrow</Option>
                                    <Option value={"lent"} key={2}>Lent</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="amount"
                                initialValue={currentRecord?.amount}
                            >
                                <Input placeholder={BORROWLENTPLACEHOLDER.inputAmount} prefix={<TagsOutlined />} />
                            </Form.Item>

                            <Form.Item
                                name="typeDate"
                            // initialValue={currentRecord?.typeDate ? moment(currentRecord.typeDate).format("DD/MM/YYYY") : ""}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    format="DD/MM/YYYY"
                                    placeholder={BORROWLENTPLACEHOLDER.inputTypeDate}
                                    showNow={false}
                                />
                            </Form.Item>

                            <Form.Item
                                name="dueDate"
                            // initialValue={currentRecord?.dueDate ? moment(currentRecord.dueDate).format("DD/MM/YYYY") : ""}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    format="DD/MM/YYYY"
                                    placeholder={BORROWLENTPLACEHOLDER.inputDueDate}
                                    showNow={false}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            }
        </>
    )
}

export default UpdateBorrowLent