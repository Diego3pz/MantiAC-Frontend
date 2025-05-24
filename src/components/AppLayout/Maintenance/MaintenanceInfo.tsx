import { Tag } from "antd";

export function MaintenanceInfo({ maintenance }: { maintenance: any }) {
    const getTypeColor = (type: string) => {
        if (type === 'Preventivo Completo') return 'green';
        if (type === 'Correctivo') return 'red';
        if (type === 'Limpieza de filtros') return 'gold';
        return 'default';
    };

    return (
        <div>
            <h3 className="font-semibold mb-4 text-lg">Información del mantenimiento</h3>
            <div className="mb-2">
                <b>Tipo:</b>{" "}
                <Tag color={getTypeColor(maintenance.type)} className="font-semibold text-xs">
                    {maintenance.type}
                </Tag>
            </div>
            <div className="mb-2"><b>Fecha:</b> {new Date(maintenance.date).toLocaleDateString()}</div>
            <div className="mb-2">
                <b>Estado:</b>{" "}
                {maintenance.completed
                    ? <Tag color="green">Completado</Tag>
                    : <Tag color="orange">Pendiente</Tag>
                }
            </div>
            <div className="mb-2"><b>Descripción:</b> {maintenance.description || <span className="text-gray-400">No aplica</span>}</div>
            <div className="mb-2"><b>Técnico:</b> {maintenance.performedBy}</div>
            <div className="mb-2"><b>Supervisor:</b> {maintenance.supervisedBy}</div>
            <div className="mb-2"><b>Costo:</b> {maintenance.cost ? `$${maintenance.cost}` : <span className="text-gray-400">No aplica</span>}</div>
            <div className="mb-2"><b>Creado:</b> {new Date(maintenance.createdAt).toLocaleString()}</div>
            <div className="mb-2"><b>Actualizado:</b> {new Date(maintenance.updatedAt).toLocaleString()}</div>
        </div>
    );
}