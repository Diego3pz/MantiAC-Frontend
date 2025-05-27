import { isAxiosError } from "axios"
import { MaintenanceArraySchema, MaintenanceSchema, type Equipment, type Maintenance, type MaintenanceFormData } from "../types"
import api from "../lib/axios"

type MaintenanceAPIType = {
    formData: MaintenanceFormData
    equipmentId: Maintenance['_id']
}

export async function createMaintenance({ formData, equipmentId }: MaintenanceAPIType) {
    try {
        const { data } = await api.post<string>(`/equipments/${equipmentId}/maintenance`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function GetAllMaintenanceByEquipment(equipmentId: Equipment['_id']) {
    try {
        const { data } = await api(`/equipments/${equipmentId}/maintenance`);
        const response = MaintenanceArraySchema.safeParse(data);
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

export async function GetAllMaintenance() {
    try {
        const { data } = await api(`/equipments/maintenance`);
        const response = MaintenanceArraySchema.safeParse(data);
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

export async function getMaintenanceById(maintenanceId: Maintenance['_id']) {
    try {
        const { data } = await api(`/equipments/maintenance/${maintenanceId}`)
        const response = MaintenanceSchema.safeParse(data)
        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type UpdateMaintenanceAPIType = {
    formData: MaintenanceFormData;
    maintenanceId: string;
};

export async function updateMaintenance({ formData, maintenanceId }: UpdateMaintenanceAPIType) {
    try {
        const { data } = await api.put<string>(`/equipments/maintenance/${maintenanceId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteMaintenance(maintenanceId: Maintenance['_id']) {
    try {
        const { data } = await api.delete<string>(`/equipments/maintenance/${maintenanceId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateMaintenanceStatus(equipmentId: string, maintenanceId: string, completed: boolean) {
    try {
        const { data } = await api.post<string>(
            `/equipments/${equipmentId}/maintenance/${maintenanceId}/completed`,
            { completed }
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}