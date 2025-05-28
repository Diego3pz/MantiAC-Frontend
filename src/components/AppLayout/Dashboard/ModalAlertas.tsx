import { Modal } from "antd";
import { AlertEquipmentComponent } from "./AlertEquipment";
import type { AlertEquipmentData } from "../../../types";


interface ModalAlertasProps {
    open: boolean;
    onClose: () => void;
    equiposConAlerta: AlertEquipmentData[];
    onMarkCompleted: (maintenanceId: string, equipmentId: string) => void;
}

export function ModalAlertas({ open, onClose, equiposConAlerta, onMarkCompleted }: ModalAlertasProps) {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title="Equipos con mantenimiento atrasado"
        >
            <AlertEquipmentComponent
                data={equiposConAlerta}
                onMarkCompleted={onMarkCompleted}
            />
        </Modal>
    );
}