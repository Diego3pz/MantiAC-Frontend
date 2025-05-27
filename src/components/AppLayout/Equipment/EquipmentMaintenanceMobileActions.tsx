import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function EquipmentMaintenanceMobileActions({ onView, onEdit, onDelete }: Props) {
    return (
        <div className="flex justify-between items-center border-t pt-2">
            <button className="flex-1 flex justify-center items-center" onClick={onView}>
                <EyeOutlined style={{ fontSize: 20 }} />
            </button>
            <div className="h-6 border-l" />
            <button className="flex-1 flex justify-center items-center" onClick={onEdit}>
                <EditOutlined style={{ fontSize: 20 }} />
            </button>
            <div className="h-6 border-l" />
            <button className="flex-1 flex justify-center items-center" onClick={onDelete}>
                <DeleteOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />
            </button>
        </div>
    );
}