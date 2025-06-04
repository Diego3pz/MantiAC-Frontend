import {
    BarcodeOutlined,
    TagOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";

type Equipment = {
    brand: string;
    serialNumber: string;
    location: string;
};

export function EquipmentInfo({ equipment }: { equipment: Equipment }) {
    return (
        <div>
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 mb-6">
                <TagOutlined style={{ fontSize: 24 }} />
                <h3 className="text-2xl font-bold flex flex-col items-center md:flex-row md:items-center gap-2 text-center md:text-left">
                    Equipo relacionado
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <TagOutlined />
                        <div className="font-semibold text-sm md:text-base">Marca</div>
                    </div>
                    <div className="break-words text-sm md:text-base max-w-full text-center md:text-left" style={{ wordBreak: "break-word" }}>
                        {equipment.brand}
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <BarcodeOutlined />
                        <div className="font-semibold text-sm md:text-base">N.º Serie</div>
                    </div>
                    <div className="break-words text-sm md:text-base max-w-full text-center md:text-left" style={{ wordBreak: "break-word" }}>
                        {equipment.serialNumber}
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1 md:col-span-2">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <EnvironmentOutlined />
                        <div className="font-semibold text-sm md:text-base">Ubicación</div>
                    </div>
                    <div className="break-words text-sm md:text-base max-w-full text-center md:text-left" style={{ wordBreak: "break-word" }}>
                        {equipment.location}
                    </div>
                </div>
            </div>
        </div>
    );
}