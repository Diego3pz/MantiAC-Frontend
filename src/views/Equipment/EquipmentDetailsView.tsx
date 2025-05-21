import { useParams } from "react-router-dom"


export default function EquipmentDetailsView() {
    const { id } = useParams()
    return (
        <>
            {id}
        </>
    )
}
