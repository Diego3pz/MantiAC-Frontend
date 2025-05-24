import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEquipmentById } from "../../services/EquipmentAPI";
import { EquipmentInfoCard } from "../../components/AppLayout/Equipment/EquipmentInfoCard";
import { EquipmentMaintenanceTable } from "../../components/AppLayout/Equipment/EquipmentMaintenanceTable";


export default function EquipmentDetailsView() {
    const params = useParams();
    const equipmentId = params.equipmentId!;

    const { data: DataEquipment, isLoading, isError } = useQuery({
        queryKey: ['equipment', equipmentId],
        queryFn: () => getEquipmentById(equipmentId),
        retry: false
    });

    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <Navigate to='/404' />;

    if (DataEquipment) return (
        <div className="mx-auto mt-8 px-2">
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