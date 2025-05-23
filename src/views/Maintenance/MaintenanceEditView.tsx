import { Navigate, useParams } from "react-router-dom";
import { getMaintenanceById } from "../../services/EquipmentAPI";
import { useQuery } from "@tanstack/react-query";
import EditMaintenanceForm from "../../components/AppLayout/Maintenance/EditMaintenanceForm";


export default function MaintenanceEditView() {
  const params = useParams()
  const maintenanceId = params.maintenanceId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editMaintenance', maintenanceId],
    queryFn: () => getMaintenanceById(maintenanceId),
    retry: false
  })

  console.log(data);
  

  if (isLoading) return 'Cargando...'
  if (isError) return <Navigate to='/404' />
  if (data) return <EditMaintenanceForm data={data} />
}
//     