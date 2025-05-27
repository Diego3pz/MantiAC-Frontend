import { Card, Badge } from "@tremor/react";

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
  return (
    <Card id="alertas">
      <h3 className="font-semibold mb-2">Equipos con alerta</h3>
      <ul>
        {data.length === 0 ? (
          <li className="text-gray-500">Sin alertas</li>
        ) : (
          data.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 mb-2 justify-between">
              <div className="flex items-center gap-2">
                <Badge color="red">{item.equipo}</Badge>
                <span className="text-sm">{item.motivo}</span>
              </div>
              {onMarkCompleted && item.id && item.equipmentId && (
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded text-xs"
                  onClick={() => onMarkCompleted(item.id!, item.equipmentId!)}
                >
                  Marcar como realizado
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </Card>
  );
}