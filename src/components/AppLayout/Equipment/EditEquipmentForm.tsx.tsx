import EquipmentForm from "./EquipmentForm";
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card } from '@tremor/react';
import type { EquipmentFormData } from "../../../types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEquipment } from "../../../services/EquipmentAPI";
import { toast } from "react-toastify";

type EditEquipmentFormProps = {
    data: EquipmentFormData
}

export default function EditEquipmentForm({ data }: EditEquipmentFormProps) {
    const navigate = useNavigate()
    const params = useParams()
    const equipmentId = params.equipmentId!

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            brand: data.brand,
            serialNumber: data.serialNumber,
            location: data.location
        }
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateEquipment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['equipment', equipmentId] })
            queryClient.invalidateQueries({ queryKey: ['editEquipments', equipmentId] })
            toast.success(data)
            navigate(`/equipments/${equipmentId}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleForm = (formData: EquipmentFormData) => {
        const data = {
            formData,
            equipmentId
        }
        mutate(data)
    }

    return (

        <>
            <div className=" flex items-center justify-center bg-gray-50 py-8">
                <Card className="w-full max-w-2xl mx-auto p-8 shadow-lg">
                    <div className="flex flex-col items-center mb-8">
                        <PlusCircleOutlined style={{ fontSize: 48, color: "#2563eb" }} />
                        <h1 className="text-2xl font-bold mt-4 mb-1 text-center">Editar equipo</h1>
                        <p className="text-gray-500 text-center max-w-md">
                            Completa el siguiente formulario para editar un equipo de tu sistema. Todos los campos son obligatorios.
                        </p>
                        <button className="mt-4 bg-blue-400 w-64 p-3 text-white uppercase font-bold rounded hover:bg-blue-500 transition-colors cursor-pointer" onClick={() => navigate('/equipments')}>
                            Volver a equipos
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit(handleForm)}
                        className="flex flex-col gap-4"
                        noValidate
                    >
                        <EquipmentForm
                            register={register}
                            errors={errors}
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 w-full p-3 text-white uppercase font-bold rounded hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                            <PlusCircleOutlined />
                            Guardar cambios
                        </button>
                    </form>
                </Card>
            </div>
        </>
    )
}
