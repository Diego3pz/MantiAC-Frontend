import { Button, Tag, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDate } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

interface EquipmentDetailsColumnProps {
    handleView: (id: string) => void;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    equipmentId: string;
}

export function useEquipmentDetailsColumns({ equipmentId, handleView, handleEdit, handleDelete }: EquipmentDetailsColumnProps) {
    const navigate = useNavigate();

    return [
        {
            title: "Tipo",
            dataIndex: "type",
            key: "type",
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
            title: "Fecha",
            dataIndex: "date",
            key: "date",
            render: (date: string) => formatDate(date)
        },
        {
            title: "Estado",
            dataIndex: "completed",
            key: "completed",
            render: (completed: boolean) =>
                completed ? <Tag color="green">Completado</Tag> : <Tag color="orange">Pendiente</Tag>,
        },
        {
            title: "Técnico",
            dataIndex: "performedBy",
            key: "performedBy",
        },
        {
            title: "Supervisor",
            dataIndex: "supervisedBy",
            key: "supervisedBy",
        },
        {
            title: "Costo",
            dataIndex: "cost",
            key: "cost",
            render: (cost: number | undefined) =>
                typeof cost === "number" ? `$${cost}` : <span style={{ color: "#aaa" }}>No aplica</span>
        },
        {
            title: "Acciones",
            key: "actions",
            render: (_: string, record: any) => (
                <Space>
                    <Tooltip title="Ver detalles">
                        <Button icon={<EyeOutlined />} onClick={() => handleView(record._id)} />
                    </Tooltip>
                    <Tooltip title="Editar">
                        <Button icon={<EditOutlined />} onClick={() => handleEdit(record._id)} />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record._id)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];
}