import { useState } from 'react';
import { Card, Button, Empty, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Card as CardTremor } from '@tremor/react';

// Ejemplo de datos
const equiposEjemplo = [
  { id: 1, brand: 'LG', serialNumber: 'SN123', location: 'Oficina 1' },
  { id: 2, brand: 'Samsung', serialNumber: 'SN456', location: 'Oficina 2' },
  { id: 3, brand: 'Yamaha', serialNumber: 'SN789', location: 'Oficina 3' },
  { id: 4, brand: 'Sony', serialNumber: 'SN101', location: 'Oficina 4' },
  { id: 5, brand: 'Apple', serialNumber: 'SN112', location: 'Oficina 5' },
  { id: 6, brand: 'Dell', serialNumber: 'SN131', location: 'Oficina 6' },
  { id: 7, brand: 'HP', serialNumber: 'SN415', location: 'Oficina 7' },
  { id: 8, brand: 'Lenovo', serialNumber: 'SN161', location: 'Oficina 8' },
  { id: 9, brand: 'Asus', serialNumber: 'SN718', location: 'Oficina 9' },
  { id: 10, brand: 'Acer', serialNumber: 'SN192', location: 'Oficina 10' },
  { id: 11, brand: 'Microsoft', serialNumber: 'SN202', location: 'Oficina 11' },
  { id: 12, brand: 'Razer', serialNumber: 'SN212', location: 'Oficina 12' },
  { id: 13, brand: 'Alienware', serialNumber: 'SN222', location: 'Oficina 13' },
  { id: 14, brand: 'Toshiba', serialNumber: 'SN232', location: 'Oficina 14' },
  { id: 15, brand: 'MSI', serialNumber: 'SN242', location: 'Oficina 15' },
  { id: 16, brand: 'Gigabyte', serialNumber: 'SN252', location: 'Oficina 16' },
];

const PAGE_SIZE = 9;

export default function EquipmentView() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);

  // Funciones de acción
  const handleView = (id: number) => {
    navigate(`/equipments/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/equipments/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Eliminar equipo con id: ${id}`);
  };

  // Paginación
  const startIdx = (current - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const equiposPagina = equiposEjemplo.slice(startIdx, endIdx);

  return (
    <>
      <CardTremor
        className="max-w-6xl mx-auto mt-4 px-2 py-4"
        style={{ minHeight: 600 }} // Puedes ajustar el valor según lo que necesites
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 px-3">
          <h2 className="text-xl font-bold">Equipos registrados</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/equipments/create')}
            className="w-full sm:w-auto"
          >
            Registrar nuevo equipo
          </Button>
        </div>
        <p className="text-center text-gray-600 mb-6">
         Visualiza, edita o elimina los equipos registrados en tu sistema.
        </p>
        {equiposEjemplo.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Empty
              description={
                <span>
                  No hay equipos registrados aún.<br />
                  ¡Registra tu primer equipo!
                </span>
              }
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {equiposPagina.map((equipo) => (
                <Card
                  key={equipo.id}
                  style={{ minWidth: 220, maxWidth: 340, width: "100%" }}
                  actions={[
                    <EyeOutlined key="view" title="Ver equipo" onClick={() => handleView(equipo.id)} />,
                    <EditOutlined key="edit" title="Editar" onClick={() => handleEdit(equipo.id)} />,
                    <DeleteOutlined key="delete" title="Eliminar" onClick={() => handleDelete(equipo.id)} />,
                  ]}
                  className="mb-2"
                >
                  <Card.Meta
                    title={equipo.brand}
                    description={
                      <>
                        <p className="mb-0"><b>N° Serie:</b> {equipo.serialNumber}</p>
                        <p className="mb-0"><b>Ubicación:</b> {equipo.location}</p>
                      </>
                    }
                  />
                </Card>
              ))}
            </div>

          </>
        )}
      </CardTremor>
      <div className="flex justify-center mt-6">
        <Pagination
          current={current}
          pageSize={PAGE_SIZE}
          total={equiposEjemplo.length}
          onChange={setCurrent}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}