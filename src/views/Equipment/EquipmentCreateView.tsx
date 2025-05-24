import { useForm } from 'react-hook-form'
import { Card } from '@tremor/react';
import EquipmentForm from '../../components/AppLayout/Equipment/EquipmentForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { EquipmentFormData } from '../../types';
import { createEquipment } from '../../services/EquipmentAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function EquipmentCreateView() {

    const navigate = useNavigate()

    const initialValues: EquipmentFormData = {
        brand: "",
        serialNumber: "",
        location: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createEquipment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['equipments'] })
            toast.success(data)
            navigate('/equipments')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleForm = (formData: EquipmentFormData) => {
        mutate(formData)
    }

    return (
        <div className=" flex items-center justify-center bg-gray-50 py-8">
            <Card className="w-full max-w-2xl mx-auto p-8 shadow-lg">
                <div className="flex flex-col items-center mb-8">
                    <PlusCircleOutlined style={{ fontSize: 48, color: "#2563eb" }} />
                    <h1 className="text-2xl font-bold mt-4 mb-1 text-center">Registrar nuevo equipo</h1>
                    <p className="text-gray-500 text-center max-w-md">
                        Completa el siguiente formulario para agregar un nuevo equipo al sistema. Todos los campos son obligatorios.
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
                        Registrar equipo
                    </button>
                </form>
            </Card>
        </div>
    )
}