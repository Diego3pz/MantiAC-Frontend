import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Table, Tag, Space, Divider, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

// Datos ficticios de ejemplo
const equipo = {
    brand: "LG",
    serialNumber: "SN1234",
    location: "Oficinas administrativas",
};

// Datos de mantenimientos ficticios
const mantenimientos = [
    {
        key: "1",
        type: "Preventivo Completo",
        date: "2024-05-01",
        completed: true,
        performedBy: "Juan Pérez",
        supervisedBy: "Carlos Encargado",
        cost: 1200,
    },
    {
        key: "2",
        type: "Correctivo",
        date: "2024-05-10",
        completed: false,
        performedBy: "Ana López",
        supervisedBy: "Carlos Encargado",
        cost: 800,
    },
    {
        key: "3",
        type: "Correctivo",
        date: "2024-05-15",
        completed: true,
        performedBy: "Pedro Ruiz",
        supervisedBy: "Carlos Encargado",
        cost: 950,
    },
    {
        key: "4",
        type: "Preventivo Completo",
        date: "2024-05-20",
        completed: false,
        performedBy: "María Gómez",
        supervisedBy: "Carlos Encargado",
        cost: 1100,
    },
    {
        key: "5",
        type: "Limpieza de filtros",
        date: "2024-05-25",
        completed: true,
        performedBy: "Luis Martínez",
        supervisedBy: "Carlos Encargado",
        cost: 500,
    },
    {
        key: "6",
        type: "Correctivo",
        date: "2024-06-01",
        completed: false,
        performedBy: "Ana López",
        supervisedBy: "Carlos Encargado",
        cost: 800,
    },
];

const mantenimientosOrdenados = [...mantenimientos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const columns = [
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
        render: (cost: number) => `$${cost}`,
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

export default function EquipmentDetailsView() {

    const params = useParams()
    const equipmentId = params.equipmentId!
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [currentMobilePage, setCurrentMobilePage] = useState(1);
    const MOBILE_PAGE_SIZE = 4;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Paginación para móvil
    const startIdx = (currentMobilePage - 1) * MOBILE_PAGE_SIZE;
    const endIdx = startIdx + MOBILE_PAGE_SIZE;
    const mantenimientosMobile = mantenimientosOrdenados.slice(startIdx, endIdx);

    return (
        <div className="mx-auto mt-8 px-2">
            <Card
                title={
                    <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-2">
                        <span className="text-xl font-bold md:p-0">Detalles del equipo</span>
                        <Space className="flex flex-col sm:flex-row mb-2 lg:mb-0">
                            <Button icon={<EditOutlined />} type="default"  onClick={() => navigate(`/equipments/${equipmentId}/edit`)} >
                                Editar equipo
                            </Button>
                            <Button icon={<DeleteOutlined />} danger type="default">
                                Eliminar equipo
                            </Button>
                        </Space>
                    </div>
                }
                className="mb-6"
            >
                <div className="mb-2">
                    <b>Marca:</b> {equipo.brand}
                </div>
                <div className="mb-2">
                    <b>N.º Serie:</b> {equipo.serialNumber}
                </div>
                <div className="mb-2">
                    <b>Ubicación:</b> {equipo.location}
                </div>
                <Divider />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <span>
                        <b>Mantenimientos asociados:</b>
                    </span>
                    <Button
                        type="primary" className="mb-2" icon={<PlusOutlined />}
                        onClick={() => navigate(`/equipments/${equipmentId}/maintenance/create`)}>
                        Registrar mantenimiento
                    </Button>
                </div>
                {isMobile ? (
                    <>
                        <div className="flex flex-col gap-4">
                            {mantenimientosMobile.map((m) => (
                                <Card key={m.key} size="small" className="shadow">
                                    <div className="flex flex-col items-start gap-1 mb-2">
                                        <Tag
                                            color={m.completed ? "green" : "orange"}
                                            className="font-semibold text-xs mb-1"
                                            style={{ marginRight: 0 }}
                                        >
                                            {m.completed ? "Completado" : "Pendiente"}
                                        </Tag>
                                        <Tag
                                            color={
                                                m.type === 'Preventivo Completo'
                                                    ? 'green'
                                                    : m.type === 'Correctivo'
                                                        ? 'red'
                                                        : m.type === 'Limpieza de filtros'
                                                            ? 'gold'
                                                            : 'default'
                                            }
                                            className="font-semibold text-xs"
                                            style={{ marginRight: 0 }}
                                        >
                                            {m.type}
                                        </Tag>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-gray-500 mb-1">
                                            <b>Fecha:</b> {m.date}
                                        </div>
                                        <div className="mb-1">
                                            <b>Técnico:</b> {m.performedBy}
                                        </div>
                                        <div className="mb-1">
                                            <b>Supervisor:</b> {m.supervisedBy}
                                        </div>
                                        <div className="mb-2">
                                            <b>Costo:</b> ${m.cost}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <button className="flex-1 flex justify-center items-center">
                                            <EyeOutlined style={{ fontSize: 20 }} />
                                        </button>
                                        <div className="h-6 border-l" />
                                        <button className="flex-1 flex justify-center items-center">
                                            <EditOutlined style={{ fontSize: 20 }}/>
                                        </button>
                                        <div className="h-6 border-l" />
                                        <button className="flex-1 flex justify-center items-center">
                                            <DeleteOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                current={currentMobilePage}
                                pageSize={MOBILE_PAGE_SIZE}
                                total={mantenimientosOrdenados.length}
                                onChange={setCurrentMobilePage}
                                showSizeChanger={false}
                                size="small"
                            />
                        </div>
                    </>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={mantenimientosOrdenados}
                        pagination={{ pageSize: 5 }}
                        bordered
                        size="small"
                        scroll={{ x: 'max-content' }}
                    />
                )}
            </Card>
        </div>
    );
}