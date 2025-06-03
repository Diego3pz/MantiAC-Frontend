import { useState } from 'react';
import { Card, Button, Empty, Pagination, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined, AntDesignOutlined, CreditCardOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Card as CardTremor } from '@tremor/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEquipment, getAllEquipments } from '../../services/EquipmentAPI';
import { toast } from 'react-toastify';
import SearchBar from '../../components/atoms/Search';
import { Modal } from 'antd';
import PageWrapper from '../../components/atoms/PageWrapper';
import { motion } from "framer-motion";


export default function EquipmentView() {
  const [modal, contextHolder] = Modal.useModal();
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
        className=" max-w-6xl mx-auto mt-4 px-2 py-4"
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
  if (data || equiposFiltrados) return (
    <PageWrapper>
      <>
        <CardTremor
          className=" max-w-6xl mx-auto mt-4 px-2 py-4"
          style={{ minHeight: 600 }}
        >
          <div className="px-3 mb-2">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Buscar por marca, serie o ubicación"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 px-3">
            <h2 className="text-xl font-bold">Equipos registrados</h2>
            <motion.div whileTap={{ scale: 0.96 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/equipments/create')}
                className="w-full sm:w-auto"
              >
                Registrar nuevo equipo
              </Button>
            </motion.div>
          </div>
          <p className="text-center text-gray-600 mb-6">
            Visualiza, edita o elimina los equipos registrados en tu sistema.
          </p>
          {equiposFiltrados.length === 0 ? (
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
                {equiposPagina?.map((equipo, idx) => (
                  <motion.div
                    key={equipo._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    style={{ width: "100%" }}
                  >
                    <Card
                      style={{ minWidth: 220, maxWidth: 340, width: "100%", minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                      className="bg-gray-100 dark:bg-gray-800 dark:text-blue-100 border border-gray-200 dark:border-gray-900 transition-colors"
                      bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, paddingBottom: 0 }}
                      actions={[
                        <Tooltip title="Ver detalles">
                          <EyeOutlined
                            key="view"
                            title="Ver detalles"
                            style={{ color: "#1677ff" }}
                            onClick={() => navigate(`/equipments/${equipo._id}`)}
                          />
                        </Tooltip>,
                        <Tooltip title="Editar">
                          <EditOutlined
                            key="edit"
                            title="Editar"
                            style={{ color: "#faad14" }}
                            onClick={() => navigate(`/equipments/${equipo._id}/edit`)}
                          />
                        </Tooltip>,
                        <Tooltip title="Eliminar">
                          <DeleteOutlined
                            key="delete"
                            title="Eliminar"
                            style={{ color: "#ff4d4f" }}
                            onClick={() => {
                              modal.confirm({
                                title: '¿Eliminar equipo?',
                                content: '¿Estás seguro de ques deseas eliminar este equipo y todos sus mantenimientos asociados?',
                                okText: 'Sí, eliminar',
                                okType: 'danger',
                                cancelText: 'Cancelar',
                                onOk: () => mutate(equipo._id),
                              });
                            }}
                          />
                        </Tooltip>
                      ]}
                    >
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="flex flex-col items-center mb-2">
                          <AntDesignOutlined style={{ fontSize: 48, color: '#b0b7c3', marginBottom: 6 }} />
                          <Tooltip title={equipo.brand}>
                            <div
                              className="break-words text-center font-bold text-lg"
                              style={{
                                wordBreak: "break-word",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "100%"
                              }}
                            >
                              {equipo.brand}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCardOutlined />
                            <span className="font-semibold">N.º Serie:</span>
                            <Tooltip title={equipo.serialNumber}>
                              <span
                                className="break-words"
                                style={{
                                  wordBreak: "break-word",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "120px",
                                  minWidth: 0
                                }}
                              >
                                {equipo.serialNumber}
                              </span>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-2">
                            <EnvironmentOutlined />
                            <span className="font-semibold">Ubicación:</span>
                            <Tooltip title={equipo.location}>
                              <span
                                className={`break-words ${equipo.location.length > 25 ? 'text-xs' : 'text-sm'} transition-all`}
                                style={{
                                  wordBreak: "break-word",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "180px",
                                  minWidth: 0
                                }}
                              >
                                {equipo.location}
                              </span>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {contextHolder}
            </>
          )}
        </CardTremor>
        <div className="flex justify-center mt-6">
          <Pagination
            current={current}
            pageSize={PAGE_SIZE}
            total={equiposFiltrados.length}
            onChange={setCurrent}
            showSizeChanger={false}
          />
        </div>
      </>
    </PageWrapper>
  );
}