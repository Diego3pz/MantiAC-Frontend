import { Modal, Table } from 'antd';
import { deleteMaintenance, GetAllMaintenance } from '../../services/MaintenanceAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import SearchBar from '../../components/atoms/Search';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMaintenanceColumns } from '../../components/AppLayout/Maintenance/MaintenanceColums';
import { getAllEquipments } from '../../services/EquipmentAPI';
import { motion } from "framer-motion";

export default function MaintenanceView() {


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

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteMaintenance,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
      toast.success(data)
    },
    onError: (error) => {
      toast.error(error.message);
    }
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

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '¿Seguro que deseas eliminar este mantenimiento?',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => mutate(id),
      modalRender: (node) => (
        <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-blue-100 rounded-lg">
          {node}
        </div>
      ),
    });
  };
  const columns = useMaintenanceColumns(handleDelete);

  if (isLoading) return 'Cargando...'
  if (data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto mt-8 px-2"
      >
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Mantenimientos registrados
        </motion.h2>
        <div className=' mb-4'>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por equipo, técnico o ubicación"
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 6 }}
          bordered
          scroll={{ x: 'max-content' }}
          className="w-full"
          rowClassName={record =>
            new Date(record.date) < new Date() && !record.completed
              ? 'bg-red-600 text-white dark:bg-red-800 dark:text-white'
              : ''
          }
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
      </motion.div>
    );
  }
}