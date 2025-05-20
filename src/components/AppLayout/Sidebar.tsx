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
            <div className="flex items-center justify-center h-16 border-b border-gray-100">
                <Avatar className="bg-blue-600 mr-2" size="large">G</Avatar>
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
                className="mt-4"
                items={menuItems}
                onClick={({ key }) => {
                    navigate(key as string)
                    if (isMobile) setMobileOpen(false)
                }}
            />
        </>
    )

    // En móvil, usar Drawer para mostrar el menú sobre el contenido
    if (isMobile) {
        return (
            <Drawer
                placement="left"
                closable={false}
                onClose={() => setMobileOpen(false)}
                open={mobileOpen}
                width={220}
                bodyStyle={{ padding: 0 }}
                className="z-50"
            >
                {menu}
            </Drawer>
        )
    }

    // En desktop, usar Sider normal
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            trigger={null}
            className="bg-white shadow-md"
            width={220}
            breakpoint="md"
        >
            {menu}
        </Sider>
    )
}

export default Sidebar