import { type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { useWatch } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { MaintenanceTypeSchema, type MaintenanceFormData, type MaintenanceType } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";

// Puedes importar los tipos de mantenimiento desde un archivo de constantes compartido si lo tienes
const maintenanceTypes: MaintenanceType[] = MaintenanceTypeSchema.options;

type MaintenanceFormProps = {
    register: UseFormRegister<MaintenanceFormData>;
    errors: FieldErrors<MaintenanceFormData>;
    control: Control<MaintenanceFormData>;
};

export default function MaintenanceForm({ register, errors, control }: MaintenanceFormProps) {
    const type = useWatch({ control, name: "type" });
    const { data: user } = useAuth();
    return (
        <>
            <label className="block font-semibold text-slate-700 dark:text-gray-100" htmlFor="type">
                Tipo de mantenimiento
            </label>
            <select
                id="type"
                {...register("type", { required: "El tipo de mantenimiento es obligatorio" })}
                className="w-full border border-blue-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-gray-800 dark:text-gray-100 transition"
            >
                <option value="">Selecciona un tipo</option>
                {maintenanceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}

            <label className="block font-semibold text-slate-700 dark:text-gray-100" htmlFor="date">
                Fecha
            </label>
            <input
                id="date"
                type="date"
                {...register("date", { required: "La fecha es obligatoria" })}
                className="w-full border border-blue-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-gray-800 dark:text-gray-100 transition"
            />
            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}

            {type === "Correctivo" && (
                <>

                    <label className="block font-semibold text-slate-700 dark:text-gray-100" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        {...register("description", { required: "La descripción es obligatoria para correctivos" })}
                        className="w-full border border-blue-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-gray-800 dark:text-gray-100 transition"
                        placeholder="Describe el mantenimiento realizado"
                        rows={3}
                    />
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

                    <label className="block font-semibold text-slate-700 dark:text-gray-100" htmlFor="cost">
                        Costo
                    </label>
                    <input
                        id="cost"
                        type="number"
                        min={0}
                        step={0.01}
                        {...register("cost", {
                            required: "El costo es obligatorio para correctivos",
                            min: { value: 0, message: "El costo no puede ser negativo" }
                        })}
                        className="w-full border border-blue-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-gray-800 dark:text-gray-100 transition"
                        placeholder="Ej: 1200"
                    />
                    {errors.cost && <ErrorMessage>{errors.cost.message}</ErrorMessage>}
                </>
            )}

            <label className="block font-semibold text-slate-700 dark:text-gray-100" htmlFor="performedBy">
                Técnico responsable
            </label>
            <p className="w-full border border-blue-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-400 bg-blue-50 dark:bg-gray-800 dark:text-gray-500 transition">
                {user?.name ?? "Usuario actual"}
            </p>

            <label className="block font-semibold text-slate-700 dark:text-gray-100" htmlFor="supervisedBy">
                Supervisor
            </label>
            <input
                id="supervisedBy"
                type="text"
                {...register("supervisedBy", {
                    required: "El supervisor es obligatorio",
                    maxLength: { value: 30, message: "Máximo 30 caracteres" },
                    validate: value => value.trim().length > 0 || "No puede estar vacío"
                })}
                className="w-full border border-blue-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-gray-800 dark:text-gray-100 transition"
                placeholder="Nombre del supervisor"
            />
            {errors.supervisedBy && <ErrorMessage>{errors.supervisedBy.message}</ErrorMessage>}
        </>
    );
}