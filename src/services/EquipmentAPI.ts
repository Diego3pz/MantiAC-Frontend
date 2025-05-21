import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardEquipmentSchema, type Equipment, type EquipmentFormData } from "../types";

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
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}