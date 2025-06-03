import { CardComponent } from "../components/AppLayout/Dashboard/Card";
import { ChartComponent } from "../components/AppLayout/Dashboard/Chart";
import { TableList } from "../components/AppLayout/Dashboard/TableList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEquipments } from "../services/EquipmentAPI";
import { GetAllMaintenance, updateMaintenanceStatus } from "../services/MaintenanceAPI";
import { formatDate } from "../utils/utils";
import { toast } from "react-toastify";
import { useState } from "react";
import { ProgressBar } from "@tremor/react";
import { ModalAlertas } from "../components/AppLayout/Dashboard/ModalAlertas";
import { BannerAlerta } from "../components/AppLayout/Dashboard/BannerAlerta";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import PageWrapper from "../components/atoms/PageWrapper";


export default function DashboardView() {

  const [showAlertModal, setShowAlertModal] = useState(false);
  const { data: user, isLoading: authLoading } = useAuth()
  const { data: equipos, isLoading: loadingEquipos } = useQuery({
    queryKey: ['equipments'],
    queryFn: getAllEquipments,
    retry: false
  });

  const { data: mantenimientos, isLoading: loadingMantenimientos } = useQuery({
    queryKey: ['maintenances'],
    queryFn: GetAllMaintenance,
    retry: false
  });

  const totalEquipos = equipos?.length ?? 0;
  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();

  // Mantenimientos de este mes
  const mantenimientosMes = (mantenimientos ?? []).filter(m => {
    const fecha = new Date(m.date);
    return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
  }).length;

  // Próximos mantenimientos
  const proximosMantenimientos = (mantenimientos ?? []).filter(m => {
    const fecha = new Date(m.date);
    return fecha > hoy && (fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24) <= 7;
  });

  // Mantenimientos por tipo para la gráfica
  const mantenimientosPorTipo = ["Preventivo Completo", "Correctivo", "Limpieza de filtros"].map(tipo => ({
    tipo,
    cantidad: (mantenimientos ?? []).filter(m => m.type === tipo).length
  }));

  // Equipos con alerta
  const equiposConAlerta = (mantenimientos ?? [])
    .filter(m => new Date(m.date) < hoy && !m.completed)
    .map(m => ({
      equipo: typeof m.equipment === "string"
        ? m.equipment
        : m.equipment?.brand ?? "Desconocido",
      motivo: "Mantenimiento atrasado",
      id: m._id, // maintenanceId
      equipmentId: typeof m.equipment === "string"
        ? m.equipment
        : m.equipment?._id
    }));

  const queryClient = useQueryClient();
  const { mutate: marcarRealizado } = useMutation({
    mutationFn: ({ equipmentId, maintenanceId }: { equipmentId: string, maintenanceId: string }) =>
      updateMaintenanceStatus(equipmentId, maintenanceId, true),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const totalMantenimientos = (mantenimientos ?? []).length;
  const mantenimientosPendientes = (mantenimientos ?? []).filter(m => !m.completed).length;

  const porcentajeAlDia = totalMantenimientos > 0
    ? Math.round(((totalMantenimientos - mantenimientosPendientes) / totalMantenimientos) * 100)
    : 100;

  if (loadingEquipos || loadingMantenimientos || authLoading) return <div>Cargando...</div>;

  if (user && equipos && mantenimientos) return (
    <PageWrapper>
      <>
        <ModalAlertas
          open={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          equiposConAlerta={equiposConAlerta}
          onMarkCompleted={(maintenanceId, equipmentId) =>
            marcarRealizado({ maintenanceId, equipmentId })
          }
        />
        <BannerAlerta
          equiposConAlerta={equiposConAlerta}
          onVerDetalles={() => setShowAlertModal(true)}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <CardComponent title="Total de Equipos" value={totalEquipos.toString()} />
          <CardComponent title="Mantenimientos este mes" value={mantenimientosMes.toString()} />
          <CardComponent title="Próximos mantenimientos" value={proximosMantenimientos.length.toString()} />
        </motion.div>

        <div className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border flex flex-col gap-2 dark:border-gray-800 transition-colors"
          >
            <span className="font-semibold mb-2">Porcentaje de equipos al día</span>
            <ProgressBar value={porcentajeAlDia} color={porcentajeAlDia === 100 ? "green" : "yellow"} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {porcentajeAlDia}% de los mantenimientos están al día ({mantenimientosPendientes} pendiente(s))
            </span>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <ChartComponent data={mantenimientosPorTipo} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <TableList
              data={proximosMantenimientos.map(m => ({
                ...m,
                equipo: typeof m.equipment === "string" ? m.equipment : m.equipment?.brand ?? "Desconocido",
                fecha: formatDate(m.date),
                tipo: m.type
              }))}
            />
          </motion.div>
        </div>
      </>
    </PageWrapper>
  );
}