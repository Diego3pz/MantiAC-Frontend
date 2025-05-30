import React from 'react'
import { Layout, Menu, Avatar, Button, Drawer } from 'antd'
import {
    UserOutlined,
    DashboardOutlined,
    SettingOutlined,
    AppstoreOutlined,
    InfoCircleOutlined,
    ToolOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider } = Layout

const menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/equipments', icon: <AppstoreOutlined />, label: 'Equipos' },
    { key: '/maintenances', icon: <ToolOutlined />, label: 'Mantenimientos' },
    { type: 'divider' as const },
    { key: '/configuration', icon: <SettingOutlined />, label: 'Configuración' },
    { key: '/account', icon: <UserOutlined />, label: 'Cuenta' },
    { key: '/informacion', icon: <InfoCircleOutlined />, label: 'Información' }
]

interface SidebarProps {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
    mobileOpen: boolean
    setMobileOpen: (value: boolean) => void
    isMobile: boolean
}

const Sidebar: React.FC<SidebarProps> = ({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
    isMobile
}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const menu = (
        <>
            <div className="flex px-2 items-center justify-between h-16 border-b border-gray-100 dark:border-gray-800">
                {(!collapsed || isMobile) && (
                    <Avatar className="bg-blue-600 mr-2" size="large">G</Avatar>
                )}
                <span
                    className={
                        `font-bold text-blue-700 text-lg tracking-wide transition-all duration-200 ` +
                        (isMobile ? 'inline' : (collapsed ? 'hidden' : 'inline'))
                    }
                >
                    MANTI AC
                </span>

                {!isMobile && (
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-2"
                        style={{ fontSize: 18 }}
                    />
                )}
            </div>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                className="mt-4 bg-white dark:bg-gray-900 dark:text-gray-100
        [&_.ant-menu-item]:transition-colors
  [&_.ant-menu-item:hover]:!bg-blue-50
  dark:[&_.ant-menu-item:hover]:!bg-gray-800
  dark:[&_.ant-menu-item]:!text-gray-200
  dark:[&_.ant-menu-submenu-title]:!text-gray-200
  [&_.ant-menu-item-selected]:!bg-blue-100
  dark:[&_.ant-menu-item-selected]:!bg-blue-900
  [&_.ant-menu-item-selected]:!text-blue-700
  dark:[&_.ant-menu-item-selected]:!text-white
  [&_.ant-menu-item-divider]:!border-gray-200
  dark:[&_.ant-menu-item-divider]:!border-gray-700"
                items={menuItems}
                onClick={({ key }) => {
                    navigate(key as string)
                    if (isMobile) setMobileOpen(false)
                }}
            />
        </>
    )

    if (isMobile) {
        return (
            <Drawer
                placement="left"
                closable={false}
                onClose={() => setMobileOpen(false)}
                open={mobileOpen}
                width={220}
                bodyStyle={{ padding: 0 }}
                className="z-50 bg-white dark:bg-gray-900 dark:text-gray-100"
            >
                {menu}
            </Drawer>
        )
    }

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            trigger={null}
            className="bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md transition-colors border-r border-gray-100 dark:border-gray-800"
            width={220}
            breakpoint="md"
        >
            {menu}
        </Sider>
    )
}

export default Sidebar