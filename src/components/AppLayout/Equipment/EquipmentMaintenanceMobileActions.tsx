import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function EquipmentMaintenanceMobileActions({ onView, onEdit, onDelete }: Props) {
    return (
        <div className="flex justify-between items-center border-t pt-2 border-gray-200 dark:border-gray-700">
            <button className="flex-1 flex justify-center items-center text-gray-200" onClick={onView}>
                <EyeOutlined style={{ fontSize: 16 }} />
            </button>
            <div className="h-6 border-l" />
            <button className="flex-1 flex justify-center items-center text-gray-200" onClick={onEdit}>
                <EditOutlined style={{ fontSize: 16 }} />
            </button>
            <div className="h-6 border-l" />
            <button className="flex-1 flex justify-center items-center text-gray-200" onClick={onDelete}>
                <DeleteOutlined style={{ fontSize: 16 }} />
            </button>
        </div>
    );
}