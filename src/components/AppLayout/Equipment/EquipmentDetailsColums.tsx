import { Button, Tag, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDate } from "../../../utils/utils";

interface EquipmentDetailsColumnProps {
    handleView: (id: string) => void;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    equipmentId: string;
}

export function useEquipmentDetailsColumns({ handleView, handleEdit, handleDelete }: EquipmentDetailsColumnProps) {

    interface EquipmentRecord {
        _id: string;
        type: string;
        date: string;
        completed: boolean;
        supervisedBy: string;
        cost?: number;
    }

    interface EquipmentDetailsColumn<T = EquipmentRecord> {
        title: string;
        dataIndex?: keyof T;
        key: string;
        render?: (value: T[keyof T], record?: T) => React.ReactNode;
    }

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
            render: (_: string, record: EquipmentRecord) => (
                <Space>
                    <Tooltip title="Ver detalles">
                        <Button
                            icon={<EyeOutlined />}
                            type="text"
                            className="text-blue-600 dark:text-blue-300 hover:!bg-blue-100 dark:hover:!bg-blue-900"
                            onClick={() => handleView(record._id)}
                        />
                    </Tooltip>
                    <Tooltip title="Editar">
                        <Button
                            icon={<EditOutlined />}
                            type="text"
                            className="text-yellow-600 dark:text-yellow-300 hover:!bg-yellow-100 dark:hover:!bg-yellow-900"
                            onClick={() => handleEdit(record._id)}
                        />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button
                            icon={<DeleteOutlined />}
                            type="text"
                            className="text-red-400 dark:text-red-400 hover:!bg-red-100 dark:hover:!bg-red-900"
                            onClick={() => handleDelete(record._id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ] as EquipmentDetailsColumn[];
}