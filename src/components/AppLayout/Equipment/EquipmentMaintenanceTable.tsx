import { Card, Button, Table, Tag, Divider, Skeleton, Pagination, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMaintenance, GetAllMaintenanceByEquipment } from "../../../services/MaintenanceAPI";
import { formatDate } from "../../../utils/utils";
import { useEquipmentDetailsColumns } from "./EquipmentDetailsColums";
import { EquipmentMaintenanceMobileActions } from "./EquipmentMaintenanceMobileActions";
import { toast } from "react-toastify";



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

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteMaintenance,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['maintenance', equipmentId] });
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message);
        }
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



    const handleView = (id: string) => navigate(`/equipments/${equipmentId}/maintenance/${id}`);
    const handleEdit = (id: string) => navigate(`/equipments/${equipmentId}/maintenance/${id}/edit`);
    const handleDelete = (id: string) => {
        Modal.confirm({
            title: '¿Seguro que deseas eliminar este mantenimiento?',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => mutate(id),
        });
    };

    const columns = useEquipmentDetailsColumns({ equipmentId, handleDelete, handleView, handleEdit });

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

    if (data) return (
        <Card
            className="mb-6 bg-white text-gray-900 border border-gray-200
        dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 transition-colors"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <span>
                    <b>Mantenimientos asociados:</b>
                </span>
                <Button
                    type="primary" className="mb-2 dark:bg-gray-700" icon={<PlusOutlined />}
                    onClick={() => navigate(`/equipments/${equipmentId}/maintenance/create`)}>
                    Registrar mantenimiento
                </Button>
            </div>
            {isMobile ? (
                <>
                    <div className="flex flex-col gap-4">
                        {mantenimientosMobile.map((m) => (
                            <Card
                                key={m._id}
                                size="small"
                                className={`shadow ${!m.completed && new Date(m.date) < new Date() ? "bg-red-500" : ""}`}
                            >
                                <div className="flex flex-col items-start gap-2 mb-2">
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
                                    <div className="mb-1">
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
                                <EquipmentMaintenanceMobileActions
                                    onView={() => navigate(`/equipments/${equipmentId}/maintenance/${m._id}`)}
                                    onEdit={() => navigate(`/equipments/${equipmentId}/maintenance/${m._id}/edit`)}
                                    onDelete={() => handleDelete(m._id)}
                                />
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
                    className="dark:[&_.ant-table]:bg-gray-900 dark:[&_.ant-table-thead>tr>th]:bg-gray-950 dark:[&_.ant-table-thead>tr>th]:text-gray-100 dark:[&_.ant-table-tbody>tr>td]:bg-gray-950 dark:[&_.ant-table-tbody>tr>td]:text-gray-100 dark:[&_.ant-table]:border-gray-900"
                    rowClassName={(record) =>
                        !record.completed && new Date(record.date) < new Date()
                            ? "bg-red-600"
                            : ""
                    }
                />
            )}
        </Card>
    );
}