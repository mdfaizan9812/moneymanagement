import React, { useEffect, useState } from 'react'
import Style from "./Category.module.css"
import { Button, Input, Modal, Form, Upload, Table, Image, Dropdown, Menu } from 'antd'
import { CATEGORY, CATEGORYPLACEHOLDER } from '../../../constants/appConstant';
import API from '../../../constants/apiConstant';
import { TagsOutlined, UploadOutlined, MoreOutlined, FolderOutlined } from '@ant-design/icons';
import { DELETE, POST } from '../../../utils/apiFunction';
import { toastUtility } from '../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { categoryDetails } from '../../../redux/action/category';
import UpdateCategory from './UpdateCategory';
import AppAlert from '../AppAlert';

const Category = () => {
    const Category = useSelector((state) => state.Category);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [iconData, setIconData] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: "",
            description: ""
        });
        dispatch(categoryDetails())
    }, [])

    function handleModalOpening() {
        setIsModalOpen(true);
    }

    function handleCancel() {
        setFormData({
            name: "",
            description: ""
        });
        form.resetFields()
        setIsModalOpen(false)
    }
    function handleValueChange(e) {
        if (e.name) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    name: e.name
                }
            })
        }
        if (e.description) {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    description: e.description
                }
            })
        }
    }

    async function handleSubmit() {
        try {
            const data = await POST(`${API.BASEURL}${API.ADD_CATEGORY}`, formData, true);
            debugger
            if ([200, 201].includes(data.status) && iconData) {
                const formDataIcon = new FormData()
                formDataIcon.append('file', iconData);
                formDataIcon.append('categoryId', data.data.data._id)
                formDataIcon.append('code', "category")
                const dataIcon = await POST(`${API.BASEURL}${API.UPLOAD_ICON}`, formDataIcon, true)
                setIconData(null)
            }
            toastUtility("success", data.data.message);
            handleCancel()
            dispatch(categoryDetails())
        } catch (error) {
            const message = error.response.data.message
            toastUtility("error", message)
        }
    }

    async function handleDelete() {
        try {
            const data = await DELETE(`${API.BASEURL}${API.DELETE_CATEGORY}/${currentRecord._id}`, true);
            toastUtility("success", data.data.message);
            dispatch(categoryDetails())
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
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: function (text, record) {
                return (
                    <>
                        {
                            record?.icon?.length ?
                                <Image src={`${API.BASEURL}/${record.icon}`} alt="Category Icon"
                                style={{width:"14px", height:"14px"}} />
                                :
                                <span><FolderOutlined /></span>
                        }
                    </>
                )
            }
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
        <div>
            {/* header */}
            <div className={Style.head}>
                <div style={{ width: "70%", height: "100%" }}></div>
                <div style={{ width: "30%", height: "100%", padding: "10px 0 0 20%" }}><Button type='primary' onClick={handleModalOpening}>Add</Button></div>
            </div>
            {isModalOpen &&
                <Modal
                    title={<p style={{ width: "90%", marginTop: "-3px" }}>Add Category</p>}
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
                                name="name"
                                rules={[{ required: true, message: CATEGORY.inputName }]}
                            >
                                <Input placeholder={CATEGORYPLACEHOLDER.inputName} prefix={<TagsOutlined />} />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                rules={[{ required: true, message: CATEGORY.inputDescription }]}
                            >
                                <Input.TextArea rows={4} placeholder={CATEGORYPLACEHOLDER.inputDescription} />
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
                        </Form>
                    </div>
                </Modal>
            }
            <Table
                dataSource={Category.data}
                columns={tableColumns}
                pagination={false}
                className={Style.tableContainer}
                rowClassNameClassName={Style.tableRow}
                scroll={{ y: 300 }}
            />
            {isUpdateModalOpen && <UpdateCategory setIsUpdateModalOpen={setIsUpdateModalOpen} isUpdateModalOpen={isUpdateModalOpen} currentRecord={currentRecord} setCurrentRecord={setCurrentRecord} />}
            {isDeleteModalOpen && <AppAlert title="Delete Category" isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} id={currentRecord._id} featureName="category" setCurrentRecord={setCurrentRecord} handleDelete={handleDelete} />}
        </div>
    )
}

export default Category