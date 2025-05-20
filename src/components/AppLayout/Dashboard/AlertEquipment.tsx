import { Card, Badge } from "@tremor/react";

interface EquipoAlerta {
  equipo: string;
  motivo: string;
}

interface EquiposConAlertaProps {
  data: EquipoAlerta[];
}

export function AlertEquipmentComponent({ data }: EquiposConAlertaProps) {
  return (
    <Card>
      <h3 className="font-semibold mb-2">Equipos con alerta</h3>
      <ul>
        {data.length === 0 ? (
          <li className="text-gray-500">Sin alertas</li>
        ) : (
          data.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 mb-2">
              <Badge color="red">{item.equipo}</Badge>
              <span className="text-sm">{item.motivo}</span>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
}