import { Layout, Input, Badge, Avatar, Button, Space, Popover } from 'antd'
import { MailOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { GetAllMaintenance } from '../../services/MaintenanceAPI'
import { useState } from 'react'
import { NotificationsPopover } from '../organisms/NotificationsPopover'

const { Header } = Layout

interface HeaderBarProps {
    isMobile: boolean
    mobileOpen: boolean
    setMobileOpen: (value: boolean) => void
}

const HeaderBar: React.FC<HeaderBarProps> = ({ isMobile, mobileOpen, setMobileOpen }) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    
    // Obtener mantenimientos y filtrar los que tienen alerta
    const { data: mantenimientos } = useQuery({
        queryKey: ['maintenances'],
        queryFn: GetAllMaintenance,
        retry: false
    })
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
                <Avatar className="bg-orange-100 text-orange-400" size="large">
                    D
                </Avatar>
                <span className="text-gray-600 dark:text-gray-200 hidden sm:inline">Delicious Burger</span>
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