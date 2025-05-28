import { z } from "zod";

// Equipment 
export const EquipmentSchema = z.object({
    _id: z.string(),
    brand: z.string(),
    serialNumber: z.string(),
    location: z.string(),
})

export const dashboardEquipmentSchema = z.array(
    EquipmentSchema.pick({
        _id: true,
        brand: true,
        serialNumber: true,
        location: true,
    })
)
export type Equipment = z.infer<typeof EquipmentSchema>
export type EquipmentFormData = Pick<Equipment, "brand" | "serialNumber" | "location">
export const MaintenanceTypeSchema = z.enum(["Preventivo Completo", "Limpieza de filtros", "Correctivo"])
export type MaintenanceType = z.infer<typeof MaintenanceTypeSchema>;
export type MaintenanceTypeForm = MaintenanceType | "";

// Maintenance
export const MaintenanceSchema = z.object({
    _id: z.string(),
    equipment: EquipmentSchema,
    type: MaintenanceTypeSchema,
    date: z.string(),
    description: z.string().optional(),
    cost: z.number().optional(),
    performedBy: z.string(),
    supervisedBy: z.string(),
    completed: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const MaintenanceFormSchema = MaintenanceSchema.pick({
    type: true,
    date: true,
    description: true,
    cost: true,
    performedBy: true,
    supervisedBy: true,
    completed: true
})

export type Maintenance = z.infer<typeof MaintenanceSchema>
export type MaintenanceFormData = Omit<Pick<Maintenance, "type" | "date" | "performedBy" | "supervisedBy" | "completed">, "type"> & {
    type: MaintenanceTypeForm;
    description?: string;
    cost?: string;
};
export const MaintenanceArraySchema = z.array(MaintenanceSchema);
export type MaintenanceArray = z.infer<typeof MaintenanceArraySchema>;

export interface AlertEquipmentData {
  equipo: string;
  motivo: string;
  id: string;
  equipmentId: string;
}