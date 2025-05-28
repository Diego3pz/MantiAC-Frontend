import { Card, Button, Space, Divider, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEquipment } from "../../../services/EquipmentAPI";
import { toast } from "react-toastify";

interface EquipmentInfoCardProps {
    equipmentId: string;
    brand: string;
    serialNumber: string;
    location: string;
}

export function EquipmentInfoCard({ equipmentId, brand, serialNumber, location }: EquipmentInfoCardProps) {
    const navigate = useNavigate();

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteEquipment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['equipments'] })
            toast.success(data)
            navigate('/equipments')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: "¿Eliminar equipo?",
            content: "¿Estás seguro de que deseas eliminar este equipo y todos sus mantenimientos asociados?",
            okText: "Sí, eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk: () => {
                mutate(equipmentId);
            },
        });
    };

    return (
        <Card
            title={
                <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-2">
                    <span className="text-xl font-bold md:p-0">Detalles del equipo</span>
                    <Space className="flex flex-col sm:flex-row mb-2 lg:mb-0">
                        <Button icon={<EditOutlined />} className=" bg-dark-tremor-brand text-white dark:bg-gray-700" type="default" onClick={() => navigate(`/equipments/${equipmentId}/edit`)} >
                            Editar equipo
                        </Button>
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={showDeleteConfirm} type="default" className=" bg-red-500 text-white dark:bg-red-800 border border-red-500 dark:border-red-800">
                            Eliminar equipo
                        </Button>
                    </Space>
                </ div>
            }
            className="mb-6 bg-white text-gray-900 border border-gray-200
        dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 transition-colors"
        >
            <div className="mb-2">
                <b>Marca:</b> {brand}
            </div>
            <div className="mb-2">
                <b>N.º Serie:</b> {serialNumber}
            </div>
            <div className="mb-2">
                <b>Ubicación:</b> {location}
            </div>
            <Divider />
        </Card>
    );
}