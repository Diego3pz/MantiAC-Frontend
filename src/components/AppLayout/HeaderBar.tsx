import { Layout, Input, Badge, Avatar, Button, Space, Popover, Dropdown, Menu } from 'antd'
import { MailOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GetAllMaintenance } from '../../services/MaintenanceAPI'
import { useState } from 'react'
import { NotificationsPopover } from '../organisms/NotificationsPopover'
import { useNavigate } from 'react-router-dom'


const { Header } = Layout

interface HeaderBarProps {
    isMobile: boolean
    mobileOpen: boolean
    setMobileOpen: (value: boolean) => void
    userName: string
}


const HeaderBar: React.FC<HeaderBarProps> = ({ isMobile, mobileOpen, setMobileOpen, userName }) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const navigate = useNavigate()

    // Obtener mantenimientos y filtrar los que tienen alerta
    const { data: mantenimientos } = useQuery({
        queryKey: ['maintenances'],
        queryFn: GetAllMaintenance,
        retry: false
    })

    const userInitial = userName ? userName.charAt(0).toUpperCase() : '?'
    const hoy = new Date()
    const equiposConAlerta = Object.values(
        (mantenimientos ?? [])
            .filter(m => new Date(m.date) < hoy && !m.completed)
            .reduce((acc, m) => {
                const equipoId = typeof m.equipment === 'string'
                    ? m.equipment
                    : m.equipment?._id;
                const equipoNombre = typeof m.equipment === 'string'
                    ? m.equipment
                    : m.equipment?.brand ?? 'Desconocido';
                if (!equipoId) return acc;
                if (!acc[equipoId]) {
                    acc[equipoId] = {
                        equipo: equipoNombre,
                        equipmentId: equipoId,
                        count: 1
                    };
                } else {
                    acc[equipoId].count += 1;
                }
                return acc;
            }, {} as Record<string, { equipo: string, equipmentId: string, count: number }>)
    );

    const queryClient = useQueryClient()
    const handleLogout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.clear()
        navigate('/auth/login', { replace: true })
    }

    const userMenu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Cerrar sesión
            </Menu.Item>
        </Menu>
    )

    return (
        <Header className="bg-white dark:bg-gray-900 dark:text-gray-100 px-4 sm:px-6 flex items-center justify-between shadow-sm gap-2 h-16 border-b border-gray-200 dark:border-gray-800 transition-colors">
            {isMobile && !mobileOpen && (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<MenuUnfoldOutlined />}
                    onClick={() => setMobileOpen(true)}
                    className="mr-2"
                />
            )}
            <Input.Search
                placeholder="Buscar"
                className="flex-1 max-w-full sm:max-w-xs"
                allowClear
            />
            <div className="flex items-center gap-2 sm:gap-4 ml-2">
                <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar className="bg-gray-800  text-blue-400 sm:hidden" size="large">
                            {userInitial}
                        </Avatar>
                        <span
                            className=" bg-gray-100 text-black dark:text-gray-100 dark:bg-gray-800 border dark:border-gray-600 rounded px-2 py-1 text-sm hidden sm:inline transition hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                        >{userName}</span>
                    </div>
                </Dropdown>
                <Space>
                    <Popover
                        content={
                            <NotificationsPopover
                                equiposConAlerta={equiposConAlerta}
                            />
                        }
                        trigger="click"
                        open={popoverOpen}
                        onOpenChange={setPopoverOpen}
                        placement="bottomRight"
                    >
                        <Badge count={equiposConAlerta.length} className='cursor-pointer'>
                            <Avatar shape="square" icon={<MailOutlined />} />
                        </Badge>
                    </Popover>
                </Space>
            </div>
        </Header>
    )
}

export default HeaderBar