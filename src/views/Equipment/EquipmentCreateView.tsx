import { useForm } from 'react-hook-form'
import { Card } from '@tremor/react';
import EquipmentForm from '../../components/AppLayout/Equipment/EquipmentForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { EquipmentFormData } from '../../types';
import { createEquipment } from '../../services/EquipmentAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

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
        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl mx-auto"
            >
                <Card className="p-8 shadow-lg">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex flex-col items-center mb-8"
                    >
                        <PlusCircleOutlined style={{ fontSize: 48, color: "#2563eb" }} />
                        <h1 className="text-2xl font-bold mt-4 mb-1 text-center">Registrar nuevo equipo</h1>
                        <p className="text-gray-500 text-center max-w-md">
                            Completa el siguiente formulario para agregar un nuevo equipo al sistema. Todos los campos son obligatorios.
                        </p>
                        <button className="mt-4 bg-blue-400 w-64 p-3 text-white uppercase font-bold rounded hover:bg-blue-500 transition-colors cursor-pointer" onClick={() => navigate('/equipments')}>
                            Volver a equipos
                        </button>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit(handleForm)}
                        className="flex flex-col gap-4"
                        noValidate
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <EquipmentForm
                            register={register}
                            errors={errors}
                        />

                        <motion.button
                            type="submit"
                            className="bg-blue-600 w-full p-3 text-white uppercase font-bold rounded hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <PlusCircleOutlined />
                            Registrar equipo
                        </motion.button>
                    </motion.form>
                </Card>
            </motion.div>
        </div>
    )
}