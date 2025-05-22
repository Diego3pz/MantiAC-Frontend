import { Table, Tag, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Datos ficticios de ejemplo
const data = [
  {
    key: '1',
    equipment: { brand: 'LG', serialNumber: 'SN1234' },
    type: 'Preventivo Completo',
    date: '2024-05-01',
    completed: true,
    performedBy: 'Juan Pérez',
    cost: 1200,
  },
  {
    key: '2',
    equipment: { brand: 'Samsung', serialNumber: 'SN5678' },
    type: 'Correctivo',
    date: '2024-05-10',
    completed: false,
    performedBy: 'Ana López',
    cost: 800,
  },
  {
    key: '3',
    equipment: { brand: 'Samsung', serialNumber: 'SN5678' },
    type: 'Correctivo',
    date: '2024-05-10',
    completed: false,
    performedBy: 'Ana López',
    cost: 800,
  },
  {
    key: '4',
    equipment: { brand: 'LG', serialNumber: 'SN1234' },
    type: 'Preventivo Completo',
    date: '2024-05-01',
    completed: true,
    performedBy: 'Juan Pérez',
    cost: 1200,
  },
  {
    key: '5',
    equipment: { brand: 'LG', serialNumber: 'SN1234' },
    type: 'Preventivo Completo',
    date: '2024-05-01',
    completed: true,
    performedBy: 'Juan Pérez',
    cost: 1200,
  },
  {
    key: '6',
    equipment: { brand: 'Samsung', serialNumber: 'SN5678' },
    type: 'Correctivo',
    date: '2024-05-10',
    completed: false,
    performedBy: 'Ana López',
    cost: 800,
  },
  {
    key: '7',
    equipment: { brand: 'LG', serialNumber: 'SN1234' },
    type: 'Preventivo Completo',
    date: '2024-05-01',
    completed: true,
    performedBy: 'Juan Pérez',
    cost: 1200,
  },
  {
    key: '8',
    equipment: { brand: 'Samsung', serialNumber: 'SN5678' },
    type: 'Correctivo',
    date: '2024-05-10',
    completed: false,
    performedBy: 'Ana López',
    cost: 800,
  },
];

const columns = [
  {
    title: 'Equipo',
    dataIndex: 'equipment',
    key: 'equipment',
    render: (equipment: any) => (
      <span>
        <b>{equipment.brand}</b> <br />
        <span className="text-gray-500">N.º Serie: {equipment.serialNumber}</span>
      </span>
    ),
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => <Tag color="blue">{type}</Tag>,
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Estado',
    dataIndex: 'completed',
    key: 'completed',
    render: (completed: boolean) =>
      completed ? <Tag color="green">Completado</Tag> : <Tag color="orange">Pendiente</Tag>,
  },
  {
    title: 'Responsable',
    dataIndex: 'performedBy',
    key: 'performedBy',
  },
  {
    title: 'Costo',
    dataIndex: 'cost',
    key: 'cost',
    render: (cost: number) => `$${cost}`,
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: (_: any, record: any) => (
      <Space>
        <Button icon={<EyeOutlined />} title='Ver'  />
        <Button icon={<EditOutlined />} title='Editar' />
        <Button icon={<DeleteOutlined />} title='Eliminar' danger />
      </Space>
    ),
  },
];

export default function MaintenanceView() {
  return (
    <div className=" mx-auto mt-8 px-2">
      <h2 className="text-2xl font-bold mb-4">Mantenimientos registrados</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 6 }}
        bordered
        scroll={{ x: 'max-content' }} // Permite scroll horizontal en móvil
        className="w-full "
      />
    </div>
  );
}