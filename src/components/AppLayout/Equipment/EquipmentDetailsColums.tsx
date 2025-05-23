import { Button, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDate } from "../../../utils/utils";

export const columns = [
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
        render: (_: string) => (
            <Space>
                <Button icon={<EyeOutlined />} size="small" />
                <Button icon={<EditOutlined />} size="small" />
                <Button icon={<DeleteOutlined />} size="small" danger />
            </Space>
        ),
    },
];