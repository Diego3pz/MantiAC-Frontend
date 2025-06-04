import { Tag, Button, Space, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from '../../../utils/utils';
import type { Maintenance } from "../../../types";
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from "react-router-dom";


export function useMaintenanceColumns(onDelete: (id: string) => void) {
    const navigate = useNavigate();

    const truncate = (text: string, max: number) =>
        text && text.length > max ? text.slice(0, max) + "…" : text;

    const columns: ColumnsType<Maintenance> = [
        {
            title: "Tipo",
            dataIndex: "type",
            key: "type",
            filters: [
                { text: 'Correctivo', value: 'Correctivo' },
                { text: 'Preventivo Completo', value: 'Preventivo Completo' },
                { text: 'Limpieza de filtros', value: 'Limpieza de filtros' },
            ],
            onFilter: (value, record) => record.type === value,
            render: (type: string) => (
                <Tag
                    color={
                        type === 'Preventivo Completo'
                            ? 'green'
                            : type === 'Correctivo'
                                ? 'red'
                                : type === 'Limpieza de filtros'
                                    ? 'gold'
                                    : 'default'
                    }
                    className="font-semibold text-xs"
                >
                    {type}
                </Tag>
            ),
        },
        {
            title: 'Ubicación',
            dataIndex: 'equipment',
            key: 'equipment',
            filters: [
                { text: 'Oficinas administrativas', value: 'Oficinas administrativas' },
                { text: 'Oficinas corporativas', value: 'Oficinas corporativas' },
                { text: 'Cafetería', value: 'Cafetería' },
                { text: 'Sala de exhibición', value: 'Sala de exhibición' },
                { text: 'Oficinas taller', value: 'Oficinas taller' },
                { text: 'Refacciones', value: 'Refacciones' },
                { text: 'Sala de espera', value: 'Sala de espera' },
                { text: 'SITE', value: 'SITE' },
                { text: 'Sala de juntas dirección general', value: 'Sala de juntas dirección general' },
                { text: 'Sala de juntas corporativo', value: 'Sala de juntas corporativo' },
                { text: 'Sala capacitación cafetería', value: 'Sala capacitación cafetería' },
            ],
            onFilter: (value, record) => record.equipment.location === value,
            render: (equipment: Maintenance['equipment']) => (
                <div className="max-w-[200px]">
                    <Tooltip title={equipment.brand}>
                        <b className="block truncate">{truncate(equipment.brand, 18)}</b>
                    </Tooltip>
                    <Tooltip title={equipment.serialNumber}>
                        <span className="text-gray-500 block truncate text-xs">
                            N.º Serie: {truncate(equipment.serialNumber, 18)}
                        </span>
                    </Tooltip>
                    <span className="text-gray-400 text-xs block truncate">{equipment.location}</span>
                </div>
            ),
        },
        {
            title: "Fecha",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (date: string) => formatDate(date)
        },
        {
            title: "Descripción",
            dataIndex: "description",
            key: "description",
            render: (desc?: string) =>
                desc
                    ? <Tooltip title={desc}>{desc.length > 20 ? desc.slice(0, 20) + "..." : desc}</Tooltip>
                    : <span style={{ color: "#aaa" }}>No aplica</span>
        },
        {
            title: "Estado",
            dataIndex: "completed",
            key: "completed",
            filters: [
                { text: 'Completado', value: true },
                { text: 'Pendiente', value: false },
            ],
            onFilter: (value, record) => record.completed === value,
            render: (completed: boolean) =>
                completed ? <Tag color="green">Completado</Tag> : <Tag color="orange">Pendiente</Tag>,
        },
        {
            title: "Costo",
            dataIndex: "cost",
            key: "cost",
            render: (cost: number | undefined) =>
                typeof cost === "number" ? `$${cost}` : <span style={{ color: "#aaa" }}>No aplica</span>
        },
        {
            title: "Creado",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => formatDate(createdAt)
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: string, record) => (
                <Space>
                    <Tooltip title="Ver detalles">
                        <Button icon={<EyeOutlined />}
                            className="text-blue-600 dark:text-blue-300 hover:!bg-blue-100 dark:hover:!bg-blue-900"
                            onClick={() => navigate(`/maintenances/${record._id}`)} />
                    </Tooltip>
                    <Tooltip title="Editar">
                        <Button icon={<EditOutlined />}
                            className="text-yellow-600 dark:text-yellow-300 hover:!bg-yellow-100 dark:hover:!bg-yellow-900"
                            onClick={() => navigate(`/maintenance/${record._id}/edit`)} />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button
                            icon={<DeleteOutlined />}
                            className="text-red-600 dark:text-red-400 hover:!bg-red-100 dark:hover:!bg-red-900"
                            onClick={() => onDelete(record._id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return columns;
}