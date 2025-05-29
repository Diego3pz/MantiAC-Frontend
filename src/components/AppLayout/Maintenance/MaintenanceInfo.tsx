import { Tag, Collapse } from "antd";
import {
    ToolOutlined,
    CalendarOutlined,
    FieldTimeOutlined,
    UserOutlined,
    TeamOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    FileTextOutlined
} from "@ant-design/icons";

const { Panel } = Collapse;


export function MaintenanceInfo({ maintenance }: { maintenance: any }) {

    const getTypeColor = (type: string) => {
        if (type === 'Preventivo Completo') return 'green';
        if (type === 'Correctivo') return 'red';
        if (type === 'Limpieza de filtros') return 'gold';
        return 'default';
    };

    return (
        <div>
            <div className="flex flex-col md:flex-col lg:flex-row items-center gap-2 mb-6">
                <ToolOutlined style={{ fontSize: 24 }} />
                <h2 className="text-2xl font-bold flex flex-col md:flex-col lg:flex-row items-center gap-2 text-center md:text-left">
                    Mantenimiento
                    <Tag color={getTypeColor(maintenance.type)} className="text-base">
                        {maintenance.type}
                    </Tag>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {/* Cada campo */}
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <CalendarOutlined />
                        <div className="font-semibold text-sm md:text-base">Fecha</div>
                    </div>
                    <div className="break-words text-sm md:text-base max-w-full text-center md:text-left">{new Date(maintenance.date).toLocaleDateString()}</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <FieldTimeOutlined />
                        <div className="font-semibold text-sm md:text-base">Estado</div>
                    </div>
                    <div className="text-center md:text-left">
                        {maintenance.completed
                            ? <Tag color="green">Completado</Tag>
                            : <Tag color="orange">Pendiente</Tag>
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <UserOutlined />
                        <div className="font-semibold text-sm md:text-base">Técnico</div>
                    </div>
                    <div className="break-words text-sm md:text-base max-w-full text-center md:text-left" style={{ wordBreak: "break-word" }}>
                        {maintenance.performedBy}
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <TeamOutlined />
                        <div className="font-semibold text-sm md:text-base">Supervisor</div>
                    </div>
                    <div className="text-center md:text-left">{maintenance.supervisedBy}</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <DollarOutlined />
                        <div className="font-semibold text-sm md:text-base">Costo</div>
                    </div>
                    <div className="text-center md:text-left">{maintenance.cost ? `$${maintenance.cost}` : <span className="text-gray-400">No aplica</span>}</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <ClockCircleOutlined />
                        <div className="font-semibold text-sm md:text-base">Creado</div>
                    </div>
                    <div className="text-center md:text-left">{new Date(maintenance.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <ClockCircleOutlined />
                        <div className="font-semibold text-sm md:text-base">Actualizado</div>
                    </div>
                    <div className="text-center md:text-left">{new Date(maintenance.updatedAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1 md:col-span-2">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <FileTextOutlined />
                        <div className="font-semibold text-sm md:text-base">Descripción</div>
                    </div>
                    <Collapse ghost className="w-full">
                        <Panel header="Ver descripción" key="1">
                            <div className="break-words text-sm md:text-base max-w-full text-center md:text-left">
                                {maintenance.description || <span className="text-gray-400">No aplica</span>}
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}