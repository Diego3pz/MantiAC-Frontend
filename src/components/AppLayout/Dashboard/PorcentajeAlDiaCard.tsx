import { ProgressBar } from "@tremor/react";

type PorcentajeAlDiaCardProps = {
  porcentajeAlDia: number;
  mantenimientosPendientes: number;
};

export function PorcentajeAlDiaCard({ porcentajeAlDia, mantenimientosPendientes }: PorcentajeAlDiaCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border flex flex-col gap-2">
      <span className="font-semibold mb-2">Porcentaje de equipos al día</span>
      <ProgressBar value={porcentajeAlDia} color={porcentajeAlDia === 100 ? "green" : "yellow"} />
      <span className="text-sm text-gray-600">
        {porcentajeAlDia}% de los mantenimientos están al día ({mantenimientosPendientes} pendiente(s))
      </span>
    </div>
  );
}