import { NavLink } from "react-router-dom";
import { ROLE } from "../constants/appConstant"
import { CameraOutlined, DollarOutlined, HomeOutlined, LineChartOutlined, SwapOutlined, TeamOutlined } from '@ant-design/icons';

export function menuItems(role) {
    if (role === ROLE.ADMIN) {
        return [
            {
                key: "1",
                icon: <HomeOutlined />,
                label: (
                    <NavLink to={"/dashboard"}>
                        Dashboard
                    </NavLink>
                ),
            },
            {
                key: "2",
                icon: <CameraOutlined />,
                label: (
                    <NavLink to={"/dashboard/category"}>
                        Category
                    </NavLink>
                ),
            },
            {
                key: "3",
                icon: <DollarOutlined />,
                label: (
                    <NavLink to={"/dashboard/expense"}>
                        Expense
                    </NavLink>
                ),
            },
            {
                key: "4",
                icon: <LineChartOutlined />,
                label: (
                    <NavLink to={"/dashboard/budget"}>
                        Budget
                    </NavLink>
                ),
            },
            {
                key: "5",
                icon: <SwapOutlined />,
                label: (
                    <NavLink to={"/dashboard/borrowlent"}>
                        Borrow & Lent
                    </NavLink>
                )
            },
            {
                key: "6",
                icon: <TeamOutlined />,
                label: (
                    <NavLink to={"/dashboard/user"}>
                        User
                    </NavLink>
                ),
            },
            {
                key: "7",
                icon: <CameraOutlined />,
                label: (
                    <NavLink to={"/dashboard/catego"}>
                        For Error Check
                    </NavLink>
                ),
            },

        ]
    } else if (role === ROLE.USER) {
        return [
            {
                key: "1",
                icon: <HomeOutlined />,
                label: (
                    <NavLink to={"/dashboard"}>
                        Dashboard
                    </NavLink>
                ),
            },
            {
                key: "3",
                icon: <DollarOutlined />,
                label: (
                    <NavLink to={"/dashboard/expense"}>
                        Expense
                    </NavLink>
                ),
            },
            {
                key: "4",
                icon: <LineChartOutlined />,

                label: (
                    <NavLink to={"/dashboard/budget"}>
                        Budget
                    </NavLink>
                ),
            },
            {
                key: "5",
                icon: <SwapOutlined />,
                label: (
                    <NavLink to={"/dashboard/borrowlent"}>
                        Borrow & Lent
                    </NavLink>
                )
            }
        ]
    }
}