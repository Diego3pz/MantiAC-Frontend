import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardEquipmentSchema, EquipmentSchema, type Equipment, type EquipmentFormData } from "../types";

export async function createEquipment(formData: EquipmentFormData) {
    try {
        const { data } = await api.post('/equipments', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllEquipments() {
    try {
        const { data } = await api('/equipments')
        const response = dashboardEquipmentSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getEquipmentById(id: Equipment['_id']) {
    try {
        const { data } = await api(`/equipments/${id}`)
        const response = EquipmentSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type EquipmentAPIType = {
    formData: EquipmentFormData
    equipmentId: Equipment['_id']
}

export async function updateEquipment({ formData, equipmentId }: EquipmentAPIType) {
    try {
        const { data } = await api.put<string>(`/equipments/${equipmentId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteEquipment(id: Equipment['_id']) {
    try {
        const { data } = await api.delete<string>(`/equipments/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}