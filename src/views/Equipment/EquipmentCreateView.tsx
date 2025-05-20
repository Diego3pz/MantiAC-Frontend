import { useForm } from 'react-hook-form'
import { Card } from '@tremor/react';
import EquipmentForm from '../../components/AppLayout/Equipment/EquipmentForm';
import { PlusCircleOutlined } from '@ant-design/icons';

export default function EquipmentCreateView() {

    const initialValues = {
        brand: "",
        serialNumber: "",
        location: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleForm = (data) => {
        console.log(data);
        // Aquí puedes agregar la lógica para guardar el equipo
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