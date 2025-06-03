import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getEquipmentById } from "../../services/EquipmentAPI"
import EditEquipmentForm from "../../components/AppLayout/Equipment/EditEquipmentForm.tsx"
import { motion } from "framer-motion"

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
    if (data)
        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <EditEquipmentForm data={data} />
            </motion.div>
        )
}
