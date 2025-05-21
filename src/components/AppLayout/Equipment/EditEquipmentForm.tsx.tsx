import EquipmentForm from "./EquipmentForm";
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card } from '@tremor/react';
import type { EquipmentFormData } from "../../../types";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

export default function EditEquipmentForm() {
    const navigate = useNavigate()
    const initialValues: EquipmentFormData = {
        brand: "",
        serialNumber: "",
        location: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleForm = (formData: EquipmentFormData) => {
        console.log(formData)
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
