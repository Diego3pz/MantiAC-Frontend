import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation, Navigate } from "react-router-dom";
import { deleteMaintenance, getMaintenanceById, updateMaintenanceStatus } from "../../services/MaintenanceAPI";
import { MaintenanceHeader } from "../../components/AppLayout/Maintenance/MaintenanceHeader";
import { MaintenanceInfo } from "../../components/AppLayout/Maintenance/MaintenanceInfo";
import { EquipmentInfo } from "../../components/AppLayout/Maintenance/EquipmentInfo";
import { Divider } from "@tremor/react";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { motion } from "framer-motion";
import { pdf } from '@react-pdf/renderer';
import { MaintenancePDF } from '../../components/pdf/MaintenancePDF';
import { useAuth } from "../../hooks/useAuth";

export default function MaintenanceDetailsView() {
    const params = useParams();
    const maintenanceId = params.maintenanceId!;
    const navigate = useNavigate();
    const location = useLocation();
    const { data: user } = useAuth();

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

    const handleDownloadPDF = async () => {
        if (!data) return;
        const blob = await pdf(
            <MaintenancePDF maintenance={data} equipment={data.equipment} technician={user} />
        ).toBlob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Mantenimiento_${data.equipment.brand}_${data.date}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };

    if (isLoading) return <div>Cargando...</div>;
    if (isError || !data) return <Navigate to='/404' />;
    if (data) return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-5xl mx-auto mt-12 px-2"
        >
            <MaintenanceHeader
                onBack={handleBack}
                onEdit={() => navigate(`/equipments/${data.equipment._id}/maintenance/${data._id}/edit`)}
                onDelete={showDeleteConfirm}
                onDownloadPDF={handleDownloadPDF}
            />
            <Divider className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800 dark:text-gray-100 transition-colors"
                >
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
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800 dark:text-gray-100 transition-colors"
                >
                    <EquipmentInfo equipment={data.equipment} />
                </motion.div>
            </div>
        </motion.div>
    );
}