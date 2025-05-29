import { List, Tooltip } from "antd";

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export function NotificationsPopover({ equiposConAlerta, onMarkCompleted }: {
  equiposConAlerta: { equipo: string, equipmentId: string, count: number }[],
  onMarkCompleted?: (equipmentId: string) => void
}) {
  return (
    <div className="min-w-[260px] max-w-xs">
      <div className="font-semibold mb-2">Notificaciones</div>
      {equiposConAlerta.length === 0 ? (
        <div className="text-gray-400 text-sm py-4 text-center">Sin notificaciones</div>
      ) : (
        <List
          dataSource={equiposConAlerta}
          renderItem={item => (
            <List.Item className="flex flex-col items-start gap-1">
              <Tooltip title={item.equipo}>
                <span
                  className="font-medium text-red-500 cursor-pointer break-all text-wrap max-w-[200px]"
                  onClick={() => item.equipmentId && window.location.assign(`/equipments/${item.equipmentId}`)}
                >
                  {item.count > 1
                    ? `(${item.count}) mantenimientos atrasados - ${truncate(item.equipo, 20)}`
                    : `Mantenimiento atrasado - ${truncate(item.equipo, 20)}`}
                </span>
              </Tooltip>
              {onMarkCompleted && item.equipmentId && (
                <button
                  className="mt-1 px-2 py-1 bg-green-500 text-white rounded text-xs"
                  onClick={() => onMarkCompleted(item.equipmentId)}
                >
                  Marcar como realizado
                </button>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );
}