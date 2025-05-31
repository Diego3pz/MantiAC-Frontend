import MaintenanceForm from "./MaintenanceForm";
import { EditOutlined } from '@ant-design/icons';
import { Card } from '@tremor/react';
import type { Maintenance, MaintenanceFormData } from "../../../types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateMaintenance } from "../../../services/MaintenanceAPI";

type EditMaintenanceFormProps = {
    data: Maintenance; // Cambia aquí
}

export default function EditMaintenanceForm({ data }: EditMaintenanceFormProps) {
    const navigate = useNavigate();
    const params = useParams();
    const maintenanceId = params.maintenanceId!;
    const equipmentId = data.equipment?._id;

    const formatDate = (isoDate: string) => isoDate.split("T")[0];

    const initialValues: MaintenanceFormData = {
        type: data.type,
        date: formatDate(data.date),
        description: data.description,
        cost: data.cost ? String(data.cost) : "",
        supervisedBy: data.supervisedBy,
        completed: data.completed,
    };

    const { register, handleSubmit, formState: { errors }, control } = useForm<MaintenanceFormData>({
        defaultValues: initialValues
    });

    console.log(initialValues.date);


    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateMaintenance,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['maintenances'] });
            queryClient.invalidateQueries({ queryKey: ['maintenance', maintenanceId] });
            if (equipmentId) {
                queryClient.invalidateQueries({ queryKey: ['editMaintenance', maintenanceId] });
            }
            toast.success(data);
            navigate(-1);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleForm = (formData: MaintenanceFormData) => {
        let cleanFormData = { ...formData };

        if (formData.type !== "Correctivo") {
            delete cleanFormData.description;
            delete cleanFormData.cost;
        }

        const data = {
            formData: cleanFormData,
            maintenanceId
        };
        mutate(data);
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-8">
            <Card className="w-full max-w-2xl mx-auto p-8 shadow-lg
    bg-white text-gray-900 border border-gray-200
    dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 transition-colors">
                <div className="flex flex-col items-center mb-8">
                    <EditOutlined style={{ fontSize: 48, color: "#2563eb" }} />
                    <h1 className="text-2xl font-bold mt-4 mb-1 text-center">Editar mantenimiento</h1>
                    <p className="text-gray-500 dark:text-gray-300 text-center max-w-md">
                        Modifica los datos del mantenimiento. Los campos marcados son obligatorios.
                    </p>
                    <button
                        className="mt-4 bg-blue-400 w-64 p-3 text-white uppercase font-bold rounded hover:bg-blue-500 transition-colors cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        Volver atrás
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="flex flex-col gap-4"
                    noValidate
                >
                    <MaintenanceForm
                        register={register}
                        errors={errors}
                        control={control}
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 w-full p-3 text-white uppercase font-bold rounded hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                        <EditOutlined />
                        Guardar cambios
                    </button>
                </form>
            </Card>
        </div>
    );
}