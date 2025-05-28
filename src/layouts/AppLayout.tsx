import { useState, useEffect } from 'react'
import { Layout} from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/AppLayout/Sidebar'
import HeaderBar from '../components/AppLayout/HeaderBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        <>
            <Layout className="min-h-screen">
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    isMobile={isMobile}
                />
                <Layout>
                    <HeaderBar
                        isMobile={isMobile}
                        mobileOpen={mobileOpen}
                        setMobileOpen={setMobileOpen}
                    />
                    <Content className="p-8 bg-gray-50 dark:bg-gray-950 dark:text-gray-100 h-[calc(100vh-64px)] overflow-y-auto transition-colors">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                autoClose={3000}
                position='bottom-center'
            />
        </>
    )
}