import { Card, Badge } from "@tremor/react";
import { useNavigate } from "react-router-dom";

interface EquipoAlerta {
  equipo: string;
  motivo: string;
  id?: string;
  equipmentId?: string;
}

interface EquiposConAlertaProps {
  data: EquipoAlerta[];
  onMarkCompleted?: (id: string, equipmentId: string) => void;
}

export function AlertEquipmentComponent({ data, onMarkCompleted }: EquiposConAlertaProps) {
  const navigate = useNavigate();

  return (
    <Card id="alertas">
      <h3 className="font-semibold mb-2">Equipos con alerta</h3>
      <ul>
        {data.length === 0 ? (
          <li className="text-gray-500">Sin alertas</li>
        ) : (
          data.map((item, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 ">
                <Badge
                  color="red"
                  className="cursor-pointer"
                  onClick={() => item.equipmentId && navigate(`/equipments/${item.equipmentId}`)}
                  title="Ver detalles del equipo"
                  style={{ textDecoration: "underline" }}
                >
                  {item.equipo}
                </Badge>
                <span className="text-sm">{item.motivo}</span>
                {onMarkCompleted && item.id && item.equipmentId && (
                  <button
                    className="w-full sm:w-auto px-2 py-1 bg-green-500 text-white rounded text-xs mb-2"
                    onClick={() => onMarkCompleted(item.id!, item.equipmentId!)}
                  >
                    Marcar como realizado
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
}