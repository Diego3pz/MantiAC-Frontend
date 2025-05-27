import {
    BarcodeOutlined,
    TagOutlined,
    EnvironmentOutlined,
    IdcardOutlined
} from "@ant-design/icons";

export function EquipmentInfo({ equipment }: { equipment: any }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <TagOutlined style={{ fontSize: 24 }} />
                <h3 className="text-2xl font-bold flex items-center gap-2">Equipo relacionado</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <TagOutlined />
                            <div className="font-semibold">Marca</div>
                        </div>
                        <div>{equipment.brand}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <BarcodeOutlined />
                            <div className="font-semibold">N.º Serie</div>
                        </div>
                        <div>{equipment.serialNumber}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <EnvironmentOutlined />
                            <div className="font-semibold">Ubicación</div>
                        </div>
                        <div>{equipment.location}</div>
                    </div>
                </div>
                {equipment._id && (
                    <div className="flex items-center gap-2 md:col-span-2">
                        <div>
                            <div className="flex items-center gap-2">
                                <IdcardOutlined />
                                <div className="font-semibold">ID</div>
                            </div>
                            <div>{equipment._id}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}