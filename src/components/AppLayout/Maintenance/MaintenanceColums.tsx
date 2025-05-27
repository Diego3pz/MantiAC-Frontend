import { Tag, Button, Space, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from '../../../utils/utils';
import type { Maintenance } from "../../../types";
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from "react-router-dom";

export function useMaintenanceColumns(onDelete: (id: string) => void) {
    const navigate = useNavigate();

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
            render: (equipment: any) => (
                <span>
                    <b>{equipment.brand}</b> <br />
                    <span className="text-gray-500">N.º Serie: {equipment.serialNumber}</span>
                    <br />
                    <span className="text-gray-400 text-xs">{equipment.location}</span>
                </span>
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
            title: 'Técnico',
            dataIndex: 'performedBy',
            key: 'performedBy',
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
                        <Button icon={<EyeOutlined />} onClick={() => navigate(`/maintenances/${record._id}`)} />
                    </Tooltip>
                    <Tooltip title="Editar">
                        <Button icon={<EditOutlined />} onClick={() => navigate(`/maintenance/${record._id}/edit`)} />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => onDelete(record._id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return columns;
}