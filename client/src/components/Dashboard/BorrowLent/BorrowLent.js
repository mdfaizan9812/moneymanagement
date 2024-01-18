import React, { useEffect, useState } from 'react'
import Style from "./BorrowLent.module.css"
import { Button, Input, Modal, Form, Table, Dropdown, Menu, Select, DatePicker } from 'antd'
import { BORROWLENTPLACEHOLDER, BORROWLENT } from '../../../constants/appConstant';
import API from '../../../constants/apiConstant';
import { TagsOutlined, MoreOutlined } from '@ant-design/icons';
import { DELETE, POST } from '../../../utils/apiFunction';
import { toastUtility } from '../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { borrowLentDetails } from '../../../redux/action/borrowLent';
import AppAlert from '../AppAlert';
import moment from 'moment';
import UpdateBorrowLent from './UpdateBorrowLent';
const { Option } = Select;

const BorrowLent = () => {
    const BorrowLent = useSelector((state) => state.BorrowLent);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [formData, setFormData] = useState({
        personName: "",
        type: "",
        amount: "",
        typeDate: "",
        dueDate: "",
    });

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            personName: "",
            type: "",
            amount: "",
            typeDate: "",
            dueDate: "",
        });
        dispatch(borrowLentDetails())
    }, [])

    function handleModalOpening() {
        setIsModalOpen(true);
    }

    function handleCancel() {
        setFormData({
            personName: "",
            type: "",
            amount: "",
            typeDate: "",
            dueDate: "",
        });
        form.resetFields()
        setIsModalOpen(false)
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

    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.ADD_BORROW_LENT}`, formData, true);
            toastUtility("success", data.data.message);
            handleCancel()
            dispatch(borrowLentDetails())
        } catch (error) {
            const message = error.response.data.message
            toastUtility("error", message)
        }
    }

    async function handleDelete() {
        try {
            const data = await DELETE(`${API.BASEURL}${API.DELETE_BORROW_LENT}/${currentRecord._id}`, true);
            toastUtility("success", data.data.message);
            dispatch(borrowLentDetails())
            setIsDeleteModalOpen(false);
            setCurrentRecord({});
        } catch (error) {
            const message = error.response.data.message
            toastUtility("error", message)
        }
    }

    const menu = (record) => (
        <Menu>
            <Menu.Item
                onClick={() => {
                    setIsUpdateModalOpen(true);
                    setCurrentRecord(record);
                }}
            >
                Update
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    setIsDeleteModalOpen(true);
                    setCurrentRecord(record);
                }}
            >
                Delete
            </Menu.Item>
        </Menu>
    );
    const tableColumns = [
        {
            title: 'Person Name',
            dataIndex: 'personName',
            key: 'personName',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Pick Date',
            key: 'typeDate',
            render: (text, record) => {
                const date = moment(record.typeDate).format("DD-MM-YYYY");
                return <span>{date}</span>
            }
        },
        {
            title: 'Due Date',
            key: 'dueDate',
            render: (text, record) => {
                const date = moment(record.dueDate).format("DD-MM-YYYY");
                return <span>{date}</span>
            }
        },
        {
            title: "Action",
            render: (text, record) => {
                return (
                    <>
                        <Dropdown overlay={() => menu(record)} placement="bottomCenter" trigger="click">
                            <div style={{ width: "20px", borderRadius: "50%", backgroundColor: "rgb(254, 253, 253)", boxShadow: "0 0 6px 0.5px #00000029", cursor: "pointer" }}><MoreOutlined /></div>
                        </Dropdown>
                    </>
                )
            },
            width: "10%",
            align: "center",
        }
    ]

    return (
        <div>
            {/* header */}
            <div className={Style.head}>
                <div style={{ width: "70%", height: "100%" }}></div>
                <div style={{ width: "30%", height: "100%", padding: "10px 0 0 20%" }}><Button type='primary' onClick={handleModalOpening}>Add</Button></div>
            </div>
            {isModalOpen &&
                <Modal
                    title={<p style={{ width: "90%", marginTop: "-3px" }}>Add BorrowLent</p>}
                    open={isModalOpen}
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
                    <div style={{ marginTop: "30px" }}>
                        <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
                            <Form.Item
                                name="personName"
                                rules={[{ required: true, message: BORROWLENT.inputPersonName }]}
                            >
                                <Input placeholder={BORROWLENTPLACEHOLDER.inputPersonName} prefix={<TagsOutlined />} />
                            </Form.Item>

                            <Form.Item
                                name="type"
                                rules={[{ required: true, message: BORROWLENT.inputType }]}
                            >
                                <Select defaultValue="None">
                                    <Option value={""} disabled={true} key={0}>None</Option>
                                    <Option value={"borrow"} key={1}>Borrow</Option>
                                    <Option value={"lent"} key={2}>Lent</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="amount"
                                rules={[{ required: true, message: BORROWLENT.inputAmount }]}
                            >
                                <Input placeholder={BORROWLENTPLACEHOLDER.inputAmount} prefix={<TagsOutlined />} />
                            </Form.Item>

                            <Form.Item
                                name="typeDate"
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(
                                                    "Please select a date"
                                                );
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
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
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(
                                                    "Please select a date"
                                                );
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
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
            <Table
                dataSource={BorrowLent.data}
                columns={tableColumns}
                pagination={false}
                className={Style.tableContainer}
                rowClassNameClassName={Style.tableRow}
                scroll={{ y: 300 }}
            />
            {isUpdateModalOpen && <UpdateBorrowLent setIsUpdateModalOpen={setIsUpdateModalOpen} isUpdateModalOpen={isUpdateModalOpen} currentRecord={currentRecord} setCurrentRecord={setCurrentRecord} />}
            {isDeleteModalOpen && <AppAlert title="Delete Borrow or lent" isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} id={currentRecord._id} featureName="borrowlent" setCurrentRecord={setCurrentRecord} handleDelete={handleDelete} />}
        </div>
    )
}

export default BorrowLent