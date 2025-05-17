import { Layout, Input, Badge, Avatar, Button, Space } from 'antd'
import { MailOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header } = Layout

interface HeaderBarProps {
    isMobile: boolean
    mobileOpen: boolean
    setMobileOpen: (value: boolean) => void
}

const HeaderBar: React.FC<HeaderBarProps> = ({ isMobile, mobileOpen, setMobileOpen }) => (
    <Header className="bg-white px-4 sm:px-6 flex items-center justify-between shadow-sm gap-2 h-16">
        {/* Botón solo en móvil y cuando el menú está cerrado */}
        {isMobile && !mobileOpen && (
            <Button
                type="primary"
                shape="circle"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setMobileOpen(true)}
                className="mr-2"
            />
        )}
        {/* Buscador ocupa el espacio restante */}
        <Input.Search
            placeholder="Buscar"
            className="flex-1 max-w-full sm:max-w-xs"
            allowClear
        />

        {/* Iconos usuario/notificaciones */}
        <div className="flex items-center gap-2 sm:gap-4 ml-2">
            <Avatar className="bg-orange-100 text-orange-400" size="large">
                D
            </Avatar>
            <span className="text-gray-600 hidden sm:inline">Delicious Burger</span>
            <Space>
                <Badge count={1} className='cursor-pointer'>
                    <Avatar shape="square" icon={<MailOutlined />} />
                </Badge>
            </Space>
        </div>
    </Header>
)

export default HeaderBar