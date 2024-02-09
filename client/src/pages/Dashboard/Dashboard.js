import React, { useEffect, useState } from 'react'
import { getItem, removeItem } from '../../utils/localStorage';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from "../../redux/action/user";
import { Button, Dropdown, Image, Layout, Menu, Space, Tooltip } from 'antd';
import Style from "./Dashboard.module.css"
import { DownOutlined } from '@ant-design/icons';
import { getUserName, shortName } from '../../utils/generalFunctions';
import { GENERAL, ROLE } from '../../constants/appConstant';
import AppSider from '../../components/AppSider';
import API from '../../constants/apiConstant';
const { Sider, Content } = Layout

const Dashboard = () => {
    const User = useSelector((state) => state.User);
    const [name, setName] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(userDetails())
        const name = shortName(User?.image, User?.username)
        setName(name)
    }, [User.image, User.username]);
    useEffect(() => {
        if (User && !(User.phoneNumber && User.dob && User.gender)) {
            navigate("/moreinfo")
        }
    }, [User])

    function handleLogout() {
        removeItem("token");
        navigate("/login");
    }

    const menu = (
        <Menu>
            <Menu.Item
                disabled={User.role === ROLE.ADMIN}
                onClick={() => {
                    navigate("/dashboard/change/password")
                }}
            >
                {GENERAL.CHANGE_PASSWORD}
            </Menu.Item>
            <Menu.Item
                onClick={handleLogout}
            >
                {GENERAL.LOGOUT}
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Layout className={Style.container}>
                <div className={Style.header}>
                    <div className={Style.leftHeader}>
                        <div className={Style.image}>
                            <Image
                                width={50}
                                height={50}
                                alt="Moneymate"
                                preview={false}
                                src={`${API.BASEURL}/${User.image}`}
                            />
                        </div>
                    </div>
                    <div className={Style.rightHeader}>
                        <div className={Style.profileBox}>

                            <Tooltip
                                overlayInnerStyle={{
                                    background: "#1890ff8f",
                                    fontSize: "11px",
                                    color: "white",
                                    cursor: "pointer",
                                    backgroundColor: "#8258c9",
                                    minWidth: "100px",
                                    textAlign: "center",
                                    placement: "bottom",
                                    lineHeight: "8px"
                                }}
                                getPopupContainer={(trigger) => trigger.parentElement}
                                title={
                                    <div >
                                        <p>{getUserName(User?.username)}</p>
                                        <p>{User?.email}</p>
                                        <p>{User?.role?.toUpperCase()}</p>
                                    </div>
                                }
                            >
                                {name?.length > 0 ?
                                    <div style={{ width: "40px", height: "40px", border: "2px solid red", borderRadius: "50%", marginTop: "10px", fontSize: "20px", fontWeight: "bolder", padding: "4px 4px" }}>
                                        {name}
                                    </div>

                                    :
                                    <div className={Style.image}>
                                        <Image
                                            width={40}
                                            height={40}
                                            alt="Moneymate"
                                            preview={false}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </div>
                                }
                            </Tooltip>
                            <Space direction="vertical" wrap style={{ marginTop: "14px" }}>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Button
                                        style={{ color: "black", fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}
                                        icon={<DownOutlined />}
                                        type="link"
                                    />
                                </Dropdown>
                            </Space>
                        </div>
                    </div>
                </div>
                <Layout hasSider className={Style.innerContainer}>
                    <Sider className={Style.sider}>
                        <AppSider />
                    </Sider>
                    <Content className={Style.content}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default Dashboard