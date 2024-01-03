import React, { useEffect, useState } from 'react'
import Style from "./Expense.module.css"
import { Button, Input, Modal, Form,  Table, Dropdown, Menu, Select, DatePicker } from 'antd'
import { EXPENSE, EXPENSEPLACEHOLDER } from '../../../constants/appConstant';
import API from '../../../constants/apiConstant';
import { TagsOutlined,  MoreOutlined, } from '@ant-design/icons';
import { DELETE, POST } from '../../../utils/apiFunction';
import { toastUtility } from '../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { categoryDetails } from '../../../redux/action/category';
import moment from 'moment';
import { expenseDetails } from '../../../redux/action/expense';
import UpdateExpense from './UpdateExpense';
import AppAlert from '../AppAlert';
const { Option } = Select;

const Expense = () => {
    const Category = useSelector((state) => state.Category);
    const Expense = useSelector((state) => state.Expense);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [month, setMonth] = useState(moment().format('yyyy-MM'));
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [formData, setFormData] = useState({
        productName: "",
        categoryId: "",
        date: "",
        paymentMethod: "cash",
        cost: "",
        note: "",
    });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            productName: "",
            categoryId: "",
            date: "",
            paymentMethod: "cash",
            cost: "",
            note: "",
        });
        dispatch(categoryDetails())
        dispatch(expenseDetails(page, limit, month.split("-")[1], month.split("-")[0]));

    }, [page, month])
    function handleModalOpening() {
        setIsModalOpen(true);
    }

    function handleCancel() {
        setFormData({
            productName: "",
            categoryId: "",
            date: "",
            paymentMethod: "cash",
            cost: "",
            note: "",
        });
        form.resetFields()
        setIsModalOpen(false)
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

    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.ADD_EXPENSE}`, formData, true);
            toastUtility("success", data.data.message);
            handleCancel()
            setPage(1);
            dispatch(expenseDetails(1, 5, month.split("-")[1], month.split("-")[0]));
        } catch (error) {
            const message = error.response.data.message
            toastUtility("error", message)
        }
    }

    async function handleDelete() {
        try {
            const data = await DELETE(`${API.BASEURL}${API.UPDATE_EXPENSE}/${currentRecord._id}`, true);
            toastUtility("success", data.data.message);
            dispatch(expenseDetails(page, limit, month.split("-")[1], month.split("-")[0]));
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
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            ellipsis: true
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
            ellipsis: true
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            ellipsis: true
        },
        {
            title: 'Price',
            dataIndex: 'cost',
            key: 'cost',
            ellipsis: true
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            ellipsis: true
        },
        {
            title: 'Description',
            dataIndex: 'note',
            key: 'note',
            ellipsis: true,
            render: (text, record) => {
                return (
                    <>
                        {
                            record?.note?.length > 0 ? <span>{record.note}</span> : <span>None</span>
                        }
                    </>
                )
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

    function handleMonthChange(e, es) {
        setMonth(moment(es).format("yyyy-MM"))
    }
    return (
        <div>
            {/* header */}
            <div className={Style.head}>
                <div style={{ width: "70%", height: "100%", paddingTop: "9px" }}>
                    <DatePicker style={{ marginLeft: "15px" }} onChange={handleMonthChange} picker="month" />
                </div>
                <div style={{ width: "30%", height: "100%", padding: "10px 0 0 20%" }}><Button type='primary' onClick={handleModalOpening}>Add</Button></div>
            </div>
            {isModalOpen &&
                <Modal
                    title={<p style={{ width: "90%", marginTop: "-3px" }}>Add Expense</p>}
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
                    <div style={{ marginTop: "10px" }}>
                        <Form form={form} onFinish={handleSubmit} onValuesChange={handleValueChange}>
                            <Form.Item
                                name="productName"
                                rules={[{ required: true, message: EXPENSE.inputProductName }]}
                            >
                                <Input placeholder={EXPENSEPLACEHOLDER.inputProductName} prefix={<TagsOutlined />} />
                            </Form.Item>
                            <Form.Item
                                name="categoryId"
                                rules={[{ required: true, message: EXPENSE.inputCategory }]}
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
                                    placeholder="Select Date"
                                    showNow={false}
                                />
                            </Form.Item>
                            <Form.Item
                                name="paymentMethod"
                            >
                                <Select defaultValue="cash">
                                    <Option value={"cash"}>CASH</Option>
                                    <Option value={"upi"}>UPI</Option>
                                    <Option value={"card"}>CARD</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="cost"
                                rules={[{ required: true, message: EXPENSE.inputCash }]}
                            >
                                <Input placeholder={EXPENSEPLACEHOLDER.inputCash} prefix={<TagsOutlined />} />
                            </Form.Item>
                            <Form.Item
                                name="note"
                            >
                                <Input.TextArea rows={4} placeholder={EXPENSEPLACEHOLDER.inputNote} />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            }
            <Table
                dataSource={Expense.data}
                columns={tableColumns}
                pagination={{
                    position: ["bottomCenter"],
                    total: Expense.total,
                    pageSize: limit,
                    current: page,
                    defaultCurrentPage: 1,
                    defaultPageSize: 5,
                    onChange: (page, pageSize) => { setPage(page) },
                    disabled: Expense.total <= 5 ? true : false
                }}
                className={Style.tableContainer}
                rowClassNameClassName={Style.tableRow}
            />
            {isUpdateModalOpen && <UpdateExpense setIsUpdateModalOpen={setIsUpdateModalOpen} isUpdateModalOpen={isUpdateModalOpen} currentRecord={currentRecord} setCurrentRecord={setCurrentRecord} page={page} limit={limit} month={month}/>}
            {isDeleteModalOpen && <AppAlert title="Delete Expense" isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} id={currentRecord._id} featureName="expense" setCurrentRecord={setCurrentRecord} handleDelete={handleDelete} />}
        </div>
    )
}

export default Expense