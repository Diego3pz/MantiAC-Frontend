

interface EquipoConAlerta {
    equipo: string;
    motivo: string;
    id: string;
    equipmentId: string;
}

interface BannerAlertaProps {
    equiposConAlerta: EquipoConAlerta[];
    onVerDetalles: () => void;
}

export function BannerAlerta({ equiposConAlerta, onVerDetalles }: BannerAlertaProps) {
    if (equiposConAlerta.length === 0) return null;
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700
                        dark:bg-red-900 dark:text-red-100 dark:border-red-700
                        p-4 mb-4 flex items-center gap-2 rounded transition-colors">
            <span className="text-2xl">⚠️</span>
            <span>
                {equiposConAlerta.length} equipo(s) con mantenimiento atrasado.
                <a
                    href="#alertas"
                    className="ml-4 text-blue-600 dark:text-blue-300 underline cursor-pointer"
                    onClick={e => {
                        e.preventDefault();
                        onVerDetalles();
                    }}
                >
                    Ver detalles
                </a>
            </span>
        </div>
    );
}