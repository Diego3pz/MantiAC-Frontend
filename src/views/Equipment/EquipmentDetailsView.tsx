import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEquipmentById } from "../../services/EquipmentAPI";
import { EquipmentInfoCard } from "../../components/AppLayout/Equipment/EquipmentInfoCard";
import { EquipmentMaintenanceTable } from "../../components/AppLayout/Equipment/EquipmentMaintenanceTable";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

export default function EquipmentDetailsView() {
    const params = useParams();
    const equipmentId = params.equipmentId!;
    const navigate = useNavigate();

    const { data: DataEquipment, isLoading, isError } = useQuery({
        queryKey: ['equipment', equipmentId],
        queryFn: () => getEquipmentById(equipmentId),
        retry: false
    });

    const handleBack = () => navigate('/equipments');

    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <Navigate to='/404' />;

    if (DataEquipment) return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mt-8 px-2"
        >
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="link"
                    className="pl-0 text-blue-600 dark:text-blue-400 mb-2"
                    onClick={handleBack}
                >
                    Regresar
                </Button>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                <EquipmentInfoCard
                    equipmentId={equipmentId}
                    brand={DataEquipment.brand}
                    serialNumber={DataEquipment.serialNumber}
                    location={DataEquipment.location}
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <EquipmentMaintenanceTable equipmentId={equipmentId} />
            </motion.div>
        </motion.div>
    );
}