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
            <div className="flex items-center gap-2 mb-6">
                <ToolOutlined style={{ fontSize: 24 }} />
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    Mantenimiento
                    <Tag color={getTypeColor(maintenance.type)} className="text-base">
                        {maintenance.type}
                    </Tag>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <CalendarOutlined />
                            <div className="font-semibold">Fecha</div>
                        </div>
                        <div>{new Date(maintenance.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <FieldTimeOutlined />
                            <div className="font-semibold">Estado</div>
                        </div>
                        <div>
                            {maintenance.completed
                                ? <Tag color="green">Completado</Tag>
                                : <Tag color="orange">Pendiente</Tag>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <UserOutlined />
                            <div className="font-semibold">Técnico</div>
                        </div>
                        <div>{maintenance.performedBy}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <TeamOutlined />
                            <div className="font-semibold">Supervisor</div>
                        </div>
                        <div>{maintenance.supervisedBy}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <DollarOutlined />
                            <div className="font-semibold">Costo</div>
                        </div>
                        <div>{maintenance.cost ? `$${maintenance.cost}` : <span className="text-gray-400">No aplica</span>}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <ClockCircleOutlined />
                            <div className="font-semibold">Creado</div>
                        </div>
                        <div>{new Date(maintenance.createdAt).toLocaleString()}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <ClockCircleOutlined />
                            <div className="font-semibold">Actualizado</div>
                        </div>
                        <div>{new Date(maintenance.updatedAt).toLocaleString()}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <FileTextOutlined />
                            <div className="font-semibold">Descripción</div>
                        </div>
                        <Collapse ghost>
                            <Panel header="Ver descripción" key="1">
                                {maintenance.description || <span className="text-gray-400">No aplica</span>}
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
}