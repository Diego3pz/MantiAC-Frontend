import { Card, Button, Space, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface EquipmentInfoCardProps {
    equipmentId: string;
    brand: string;
    serialNumber: string;
    location: string;
}

export function EquipmentInfoCard({ equipmentId, brand, serialNumber, location }: EquipmentInfoCardProps) {
    const navigate = useNavigate();

    return (
        <Card
            title={
                <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-2">
                    <span className="text-xl font-bold md:p-0">Detalles del equipo</span>
                    <Space className="flex flex-col sm:flex-row mb-2 lg:mb-0">
                        <Button icon={<EditOutlined />} type="default" onClick={() => navigate(`/equipments/${equipmentId}/edit`)} >
                            Editar equipo
                        </Button>
                        <Button icon={<DeleteOutlined />} danger type="default">
                            Eliminar equipo
                        </Button>
                    </Space>
                </div>
            }
            className="mb-6"
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