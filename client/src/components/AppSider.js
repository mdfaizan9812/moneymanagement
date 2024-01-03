import React from 'react'
import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { menuItems } from "../utils/menuItems"

const AppSider = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ position: "relative" }}>
            <Button
                onClick={toggleCollapsed}
                style={{
                    background: "none",
                    margin: "5px"
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={["1"]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={menuItems("admin")}
            />
        </div>
    )
}

export default AppSider