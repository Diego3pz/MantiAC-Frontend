import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getEquipmentById } from "../../services/EquipmentAPI"
import EditEquipmentForm from "../../components/AppLayout/Equipment/EditEquipmentForm.tsx"


export default function EquipmentEditView() {
    const params = useParams()
    const equipmentId = params.equipmentId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editEquipments', equipmentId],
        queryFn: () => getEquipmentById(equipmentId),
        retry: false
    })

    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to='/404' />
    if (data) return <EditEquipmentForm data={data} />
}
