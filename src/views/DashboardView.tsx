import { AlertEquipmentComponent } from "../components/AppLayout/Dashboard/AlertEquipment";
import { CardComponent } from "../components/AppLayout/Dashboard/Card";
import { ChartComponent } from "../components/AppLayout/Dashboard/Chart";
import { TableList } from "../components/AppLayout/Dashboard/TableList";

// Ejemplos de datos para el dashboard
const mantenimientosPorTipo = [
  { tipo: "Preventivo Completo", cantidad: 3 },
  { tipo: "Correctivo", cantidad: 1 },
  { tipo: "Limpieza de filtros", cantidad: 2 },
];

// Ejemplo de equipos con alerta
const equiposConAlerta = [
  { equipo: "AC-202", motivo: "Mantenimiento atrasado" },
  { equipo: "AC-305", motivo: "Falla reportada" },
];

const proximosMantenimientos = [
  { equipo: "AC-101", fecha: "2025-05-22", tipo: "Preventivo Completo" },
  { equipo: "AC-202", fecha: "2025-05-25", tipo: "Correctivo" },
  { equipo: "AC-202", fecha: "2025-05-25", tipo: "Limpieza de filtros" },
];

export default function DashboardView() {
  const equipos = 12;
  const mantenimientosMes = 5;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardComponent title="Total de Equipos" value={equipos.toString()} />
        <CardComponent title="Mantenimientos este mes" value={mantenimientosMes.toString()} />
        <CardComponent title="Próximos mantenimientos" value={proximosMantenimientos.length.toString()} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartComponent data={mantenimientosPorTipo} />
        <AlertEquipmentComponent data={equiposConAlerta} />
      </div>

      <div className="mt-6">
        <TableList data={proximosMantenimientos} />
      </div>
    </>
  );
}