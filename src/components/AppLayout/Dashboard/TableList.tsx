import {
    Card,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

type Mantenimiento = {
    equipo: string;
    fecha: string;
    tipo: string;
};

interface TableListProps {
    data: Mantenimiento[];
}

export function TableList({ data }: TableListProps) {
    return (
        <Card>
            <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mb-2">
                Próximos mantenimientos en los próximos 7 días
            </h3>
            <div className="overflow-x-auto">
                <Table className="mt-2 w-full">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell className="w-1/3 text-left">Equipo</TableHeaderCell>
                            <TableHeaderCell className="w-1/3 text-left">Fecha</TableHeaderCell>
                            <TableHeaderCell className="w-1/3 text-left">Tipo</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="w-1/3 text-left">{item.equipo}</TableCell>
                                <TableCell className="w-1/3 text-left">{item.fecha}</TableCell>
                                <TableCell className="w-1/3 text-left">
                                    <Badge
                                        color={
                                            item.tipo === 'Preventivo Completo'
                                                ? 'green'
                                                : item.tipo === 'Correctivo'
                                                    ? 'red'
                                                    : item.tipo === 'Limpieza de filtros'
                                                        ? 'yellow'
                                                        : 'gray'
                                        }
                                    >
                                        {item.tipo}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}