import { Card, BarChart } from "@tremor/react";

interface MantenimientoPorTipo {
  tipo: string;
  cantidad: number;
}

interface MantenimientosPorTipoChartProps {
  data: MantenimientoPorTipo[];
}

export function ChartComponent({ data }: MantenimientosPorTipoChartProps) {
  return (
    <Card>
      <h3 className="font-semibold mb-2">Mantenimientos por tipo (mes actual)</h3>
      <BarChart
        data={data}
        index="tipo"
        categories={["cantidad"]}
        colors={["blue"]}
        yAxisWidth={40}
        className="h-64"
      />
    </Card>
  );
}