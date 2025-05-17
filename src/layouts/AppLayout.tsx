import { useState, useEffect } from 'react'
import { Layout, Button } from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/AppLayout/Sidebar'
import HeaderBar from '../components/AppLayout/HeaderBar'
import { MenuUnfoldOutlined } from '@ant-design/icons'

const { Content } = Layout

export default function AppLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Detectar tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Layout className="min-h-screen">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                isMobile={isMobile}
            />
            {/* Botón flotante solo en móvil y cuando el menú está cerrado */}
            {isMobile && !mobileOpen && (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<MenuUnfoldOutlined />}
                    onClick={() => setMobileOpen(true)}
                    className="fixed top-4 left-4 z-50"
                />
            )}
            <Layout>
                <HeaderBar
                    isMobile={isMobile}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />
                <Content className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}