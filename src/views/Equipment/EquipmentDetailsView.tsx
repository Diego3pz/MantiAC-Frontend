import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEquipmentById } from "../../services/EquipmentAPI";
import { EquipmentInfoCard } from "../../components/AppLayout/Equipment/EquipmentInfoCard";
import { EquipmentMaintenanceTable } from "../../components/AppLayout/Equipment/EquipmentMaintenanceTable";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
        <div className="mx-auto mt-8 px-2">
            <Button
                icon={<ArrowLeftOutlined />}
                type="link"
                className="pl-0 text-blue-600 dark:text-blue-400 mb-2"
                onClick={handleBack}
            >
                Regresar
            </Button>
            <EquipmentInfoCard
                equipmentId={equipmentId}
                brand={DataEquipment.brand}
                serialNumber={DataEquipment.serialNumber}
                location={DataEquipment.location}
            />
            <EquipmentMaintenanceTable equipmentId={equipmentId} />
        </div>
    );
}