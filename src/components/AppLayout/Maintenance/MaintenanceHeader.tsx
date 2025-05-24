import { Button, Space, Tooltip } from "antd";
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";

interface Props {
    onBack: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onPrint: () => void;
    onDownloadPDF: () => void;
}

export function MaintenanceHeader({ onBack, onEdit, onDelete, onPrint, onDownloadPDF }: Props) {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="link"
                    className="pl-0 text-blue-600"
                    onClick={onBack}
                >
                    Regresar
                </Button>
                <h2 className="text-2xl font-bold mt-2 md:mt-0">Detalle del mantenimiento</h2>
            </div>
            <Space>
                <Tooltip title="Editar">
                    <Button icon={<EditOutlined />} onClick={onEdit} />
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Button icon={<DeleteOutlined />} danger onClick={onDelete} />
                </Tooltip>
                <Tooltip title="Imprimir">
                    <Button icon={<PrinterOutlined />} onClick={onPrint} />
                </Tooltip>
                <Tooltip title="Descargar PDF">
                    <Button icon={<FilePdfOutlined />} onClick={onDownloadPDF} />
                </Tooltip>
            </Space>
        </div>
    );
}