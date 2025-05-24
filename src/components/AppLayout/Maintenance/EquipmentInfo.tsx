export function EquipmentInfo({ equipment }: { equipment: any }) {
    return (
        <div>
            <h3 className="font-semibold mb-4 text-lg">Equipo relacionado</h3>
            <div className="mb-2"><b>Marca:</b> {equipment.brand}</div>
            <div className="mb-2"><b>N.º Serie:</b> {equipment.serialNumber}</div>
            <div className="mb-2"><b>Ubicación:</b> {equipment.location}</div>
        </div>
    );
}