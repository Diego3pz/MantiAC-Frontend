import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation, Navigate } from "react-router-dom";
import { deleteMaintenance, getMaintenanceById, updateMaintenanceStatus } from "../../services/MaintenanceAPI";
import { MaintenanceHeader } from "../../components/AppLayout/Maintenance/MaintenanceHeader";
import { MaintenanceInfo } from "../../components/AppLayout/Maintenance/MaintenanceInfo";
import { EquipmentInfo } from "../../components/AppLayout/Maintenance/EquipmentInfo";
import { Divider } from "@tremor/react";
import { toast } from "react-toastify";
import { Modal } from "antd";

export default function MaintenanceDetailsView() {
    const params = useParams();
    const maintenanceId = params.maintenanceId!;
    const navigate = useNavigate();
    const location = useLocation();

    // Llamada a la API para obtener los detalles del mantenimiento
    const { data, isLoading, isError } = useQuery({
        queryKey: ['maintenance', maintenanceId],
        queryFn: () => getMaintenanceById(maintenanceId),
        retry: false
    });

    const equipmentId = data?.equipment._id!!

    // Mutación para eliminar el mantenimiento
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteMaintenance,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['maintenance', equipmentId] });
            queryClient.invalidateQueries({ queryKey: ['maintenances'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { mutate: marcarRealizado, isPending: marcando } = useMutation({
        mutationFn: () => updateMaintenanceStatus(equipmentId, maintenanceId, true),
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['maintenance', maintenanceId] });
            queryClient.invalidateQueries({ queryKey: ['maintenance', equipmentId] });
            queryClient.invalidateQueries({ queryKey: ['maintenances'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });


    const handleBack = () => {
        if (location.pathname.includes("/equipments/")) {
            navigate(`/equipments/${data?.equipment?._id}`);
        } else {
            navigate("/maintenances");
        }
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: "¿Eliminar Mantenimiento?",
            content: "¿Estás seguro de que deseas eliminar este mantenimiento?",
            okText: "Sí, eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk: () => {
                mutate(maintenanceId);
                if (location.pathname.includes("/equipments/")) {
                    navigate(`/equipments/${data?.equipment._id}`);
                } else {
                    navigate("/maintenances");
                }
            },
        });
    };

    if (isLoading) return <div>Cargando...</div>;
    if (isError || !data) return <Navigate to='/404' />;
    if (data) return (
        <div className="max-w-5xl mx-auto mt-12 px-2">
            <MaintenanceHeader
                onBack={handleBack}
                onEdit={() => navigate(`/equipments/${data.equipment._id}/maintenance/${data._id}/edit`)}
                onDelete={showDeleteConfirm}
                onPrint={() => window.print()}
                onDownloadPDF={() => { }}
            />
            <Divider className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow p-6 border">
                    <MaintenanceInfo maintenance={data} />
                    {!data.completed && (
                        <button
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            onClick={() => marcarRealizado()}
                            disabled={marcando}
                        >
                            {marcando ? "Marcando..." : "Marcar como realizado"}
                        </button>
                    )}
                </div>
                <div className="bg-white rounded-xl shadow p-6 border">
                    <EquipmentInfo equipment={data.equipment} />
                </div>
            </div>
        </div>
    );
}