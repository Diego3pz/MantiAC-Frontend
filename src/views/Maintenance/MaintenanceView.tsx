import { Table } from 'antd';
import { getAllEquipments, GetAllMaintenance } from '../../services/EquipmentAPI';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SearchBar from '../../components/atoms/Search';
import { useNavigate } from 'react-router-dom';
import { useMaintenanceColumns } from '../../components/AppLayout/Maintenance/MaintenanceColums';



export default function MaintenanceView() {
  const columns = useMaintenanceColumns();
  
  const navigate = useNavigate();
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['maintenances'],
    queryFn: GetAllMaintenance,
    retry: false
  })
  const { data: equipos } = useQuery({
    queryKey: ['equipments'],
    queryFn: getAllEquipments,
    retry: false
  });

  const dataWithKeys = data?.map((item) => ({
    ...item,
    key: item._id,
  }))

  // Filtro por búsqueda
  const filteredData = dataWithKeys?.filter(item =>
    item.equipment.brand.toLowerCase().includes(search.toLowerCase()) ||
    item.equipment.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
    (item.equipment.location && item.equipment.location.toLowerCase().includes(search.toLowerCase())) ||
    (item.performedBy && item.performedBy.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) return 'Cargando...'
  if (data) {
    return (
      <div className="mx-auto mt-8 px-2">
        <h2 className="text-2xl font-bold mb-4">Mantenimientos registrados</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por equipo, técnico o ubicación"
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 6 }}
          bordered
          scroll={{ x: 'max-content' }}
          className="w-full"
          locale={{
            emptyText: (
              <div className="text-center py-8 text-gray-500">
                {(!data || data.length === 0) && (
                  <>
                    <span>
                      No hay mantenimientos registrados aún.<br />
                      {(!equipos || equipos.length === 0) ? (
                        <div>
                          Debes registrar al menos un equipo para poder crear mantenimientos.<br />
                          <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => navigate('/equipments/create')}
                          >
                            Registrar equipo
                          </button>
                        </div>
                      ) : (
                        <div>¡Registra un mantenimiento desde la vista de un equipo!
                          <br />
                          <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => navigate('/equipments')}
                          >
                            Ir a equipos
                          </button>
                        </div>
                      )}
                    </span>
                  </>
                )}
              </div>
            ),
          }}
        />
      </div>
    );
  }
}