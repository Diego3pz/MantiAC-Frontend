import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getMaintenanceById } from "../../services/EquipmentAPI";
import { MaintenanceHeader } from "../../components/AppLayout/Maintenance/MaintenanceHeader";
import { MaintenanceInfo } from "../../components/AppLayout/Maintenance/MaintenanceInfo";
import { EquipmentInfo } from "../../components/AppLayout/Maintenance/EquipmentInfo";
import { Divider } from "@tremor/react";

export default function MaintenanceDetailsView() {
    const params = useParams();
    const maintenanceId = params.maintenanceId!;
    const navigate = useNavigate();
    const location = useLocation();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['maintenance', maintenanceId],
        queryFn: () => getMaintenanceById(maintenanceId),
        retry: false
    });

    if (isLoading) return <div>Cargando...</div>;
    if (isError || !data) return <div>Error al cargar el mantenimiento</div>;

    const handleBack = () => {
        if (location.pathname.includes("/equipments/")) {
            navigate(`/equipments/${data.equipment._id}`);
        } else {
            navigate("/maintenances");
        }
    };

    if (data) return (
        <div className="max-w-5xl mx-auto mt-12 px-2">
            <MaintenanceHeader
                onBack={handleBack}
                onEdit={() => navigate(`/equipments/${data.equipment._id}/maintenance/${data._id}/edit`)}
                onDelete={() => { }}
                onPrint={() => window.print()}
                onDownloadPDF={() => { }}
            />
            <Divider className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow p-6 border">
                    <MaintenanceInfo maintenance={data} />
                </div>
                <div className="bg-white rounded-xl shadow p-6 border">
                    <EquipmentInfo equipment={data.equipment} />
                </div>
            </div>
        </div>
    );
}