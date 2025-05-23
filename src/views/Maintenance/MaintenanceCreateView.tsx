import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import MaintenanceForm from "../../components/AppLayout/Maintenance/MaintenanceForm"
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card } from '@tremor/react';
import { createMaintenance } from "../../services/EquipmentAPI"
import type { MaintenanceFormData } from "../../types"


export default function MaintenanceCreateView() {
  const navigate = useNavigate()
  const params = useParams()
  const equipmentId = params.equipmentId!

  const initialValues: MaintenanceFormData = {
    type: "",
    date: "",
    description: "",
    cost: "",
    performedBy: "",
    supervisedBy: "",
    completed: false
  }

  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createMaintenance,
    onSuccess: (data) => {
      toast.success(data)
      navigate(`/equipments/${equipmentId}`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleForm = async (formData: MaintenanceFormData) => {
    let cleanFormData = { ...formData };

    if (formData.type !== "Correctivo") {
      delete cleanFormData.description;
      delete cleanFormData.cost;
    }

    mutate({
      formData: cleanFormData,
      equipmentId
    });
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-8">
      <Card className="w-full max-w-2xl mx-auto p-8 shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <PlusCircleOutlined style={{ fontSize: 48, color: "#2563eb" }} />
          <h1 className="text-2xl font-bold mt-4 mb-1 text-center">Registrar nuevo mantenimiento</h1>
          <p className="text-gray-500 text-center max-w-md">
            Completa el siguiente formulario para agregar un mantenimiento al equipo. Todos los campos son obligatorios.
          </p>
          <button className="mt-4 w-full bg-blue-400 md:w-64 p-3 text-white uppercase font-bold rounded hover:bg-blue-500 transition-colors cursor-pointer" onClick={() => navigate(`/equipments/${equipmentId}`)}>
            Volver a equipo
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
            <PlusCircleOutlined />
            Registrar mantenimiento
          </button>
        </form>
      </Card>
    </div>
  )
}
