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