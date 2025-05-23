import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import type { EquipmentFormData } from "../../../types";
import { locationTraslation } from "../../../locales/es";

type EquipmentFormProps = {
    register: UseFormRegister<EquipmentFormData>;
    errors: FieldErrors<EquipmentFormData>
}


export default function EquipmentForm({ register, errors }: EquipmentFormProps) {
    return (
        <>
            {/* Marca */}
            <label className="block font-semibold  text-slate-700" htmlFor="brand">
                Marca
            </label>
            <input
                id="brand"
                type="text"
                {...register("brand", { required: "La marca es obligatoria" })}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400 transition"
                placeholder="Ej: LG, Samsung, etc."
            />
            {errors.brand && (
                <ErrorMessage>{errors.brand.message}</ErrorMessage>
            )}

            {/* Número de serie */}
            <label className="block font-semibold  text-slate-700" htmlFor="serialNumber">
                Número de serie
            </label>
            <input
                id="serialNumber"
                type="text"
                {...register("serialNumber", { required: "El número de serie es obligatorio" })}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400 transition"
                placeholder="Ej: SN123456"
            />
            {errors.serialNumber && (
                <ErrorMessage>{errors.serialNumber.message}</ErrorMessage>
            )}

            {/* Ubicación */}
            <label className="block font-semibold  text-slate-700" htmlFor="location">
                Ubicación
            </label>
            <select
                id="location"
                {...register("location", { required: "La ubicación es obligatoria" })}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400 transition"
            >
                {Object.entries(locationTraslation).map(([key, value]) => (
                    <option key={key} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            {errors.location && (
                <ErrorMessage>{errors.location.message}</ErrorMessage>
            )}
        </>
    );
}