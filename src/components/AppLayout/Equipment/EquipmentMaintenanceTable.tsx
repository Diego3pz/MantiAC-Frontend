import { Card, Button, Table, Tag, Divider, Skeleton, Pagination } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllMaintenanceByEquipment } from "../../../services/EquipmentAPI";
import { columns } from "./EquipmentDetailsColums";
import { formatDate } from "../../../utils/utils";



interface EquipmentMaintenanceTableProps {
    equipmentId: string;
}

export function EquipmentMaintenanceTable({ equipmentId }: EquipmentMaintenanceTableProps) {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [currentMobilePage, setCurrentMobilePage] = useState(1);
    const MOBILE_PAGE_SIZE = 4;

    const { data, isLoading } = useQuery({
        queryKey: ['maintenance', equipmentId],
        queryFn: () => GetAllMaintenanceByEquipment(equipmentId),
        enabled: !!equipmentId,
        retry: false
    });

    const mantenimientosArray = Array.isArray(data) ? data : [];
    const mantenimientosOrdenados = mantenimientosArray.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

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

    if (isLoading) return (
        <div className="mx-auto mt-8 px-2">
            <Card title={<Skeleton.Input style={{ width: 200 }} active />} className="mb-6">
                <Skeleton active paragraph={{ rows: 4 }} />
                <Divider />
                <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 3, width: ['60%', '80%', '40%'] }}
                />
                <Divider />
                <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 5, width: ['100%', '100%', '100%', '100%', '100%'] }}
                />
            </Card>
        </div>
    );

    return (
        <Card className="mb-6">
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
                            <Card key={m._id} size="small" className="shadow">
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
                                        <b>Fecha:</b> {formatDate(m.date)}
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
                                        <EditOutlined style={{ fontSize: 20 }} />
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
                    rowKey="_id"
                />
            )}
        </Card>
    );
}