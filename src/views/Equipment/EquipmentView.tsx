import { useState } from 'react';
import { Card, Button, Empty, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined, AntDesignOutlined, CreditCardOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Card as CardTremor } from '@tremor/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEquipment, getAllEquipments } from '../../services/EquipmentAPI';
import { toast } from 'react-toastify';
import SearchBar from '../../components/atoms/Search';



export default function EquipmentView() {

  const [search, setSearch] = useState("");


  const { data, isLoading } = useQuery({
    queryKey: ['equipments'],
    queryFn: getAllEquipments,
    retry: false
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteEquipment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] })
      toast.success(data)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);

  const equiposFiltrados = data?.filter(equipo =>
    [equipo.brand, equipo.serialNumber, equipo.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  ) || [];

  // Paginación
  const PAGE_SIZE = 6;
  const startIdx = (current - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const equiposPagina = equiposFiltrados.slice(startIdx, endIdx);

  if (isLoading) {
    return (
      <CardTremor
        className="max-w-6xl mx-auto mt-4 px-2 py-4"
        style={{ minHeight: 600 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {[...Array(PAGE_SIZE)].map((_, idx) => (
            <Card
              key={idx}
              style={{ minWidth: 220, maxWidth: 340, width: "100%" }}
              className="mb-2"
            >
              <Skeleton loading={true} active paragraph={{ rows: 2 }} />
            </Card>
          ))}
        </div>
      </CardTremor>
    );
  }
  if (data) return (
    <>
      <CardTremor
        className="max-w-6xl mx-auto mt-4 px-2 py-4"
        style={{ minHeight: 600 }}
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por marca, serie o ubicación"
        />
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
        {data.length === 0 ? (
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
              {equiposPagina?.map((equipo) => (
                <Card
                  key={equipo._id}
                  style={{ minWidth: 220, maxWidth: 340, width: "100%" }}
                  actions={[
                    <EyeOutlined key="view" title="Ver equipo" onClick={() => navigate(`/equipments/${equipo._id}`)} />,
                    <EditOutlined key="edit" title="Editar" onClick={() => navigate(`/equipments/${equipo._id}/edit`)} />,
                    <DeleteOutlined key="delete" title="Eliminar" onClick={() => mutate(equipo._id)} />,
                  ]}
                  className="mb-2"
                  bodyStyle={{ paddingBottom: 0 }}
                >
                  <div className="flex flex-col items-center mb-2">
                    <AntDesignOutlined style={{ fontSize: 48, color: '#b0b7c3' }} />
                    <div className="text-lg font-semibold mt-2 mb-1">{equipo.brand}</div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCardOutlined />
                      <span className="font-semibold">N.º Serie:</span>
                      <span>{equipo.serialNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <EnvironmentOutlined />
                      <span className="font-semibold">Ubicación:</span>
                      <span>{equipo.location}</span>
                    </div>
                  </div>
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
          total={data.length}
          onChange={setCurrent}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}