import { useState } from "react";
import { Tabs, Modal, Typography, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ProfileForm from "../../components/AppLayout/Account/EditAccount";
import PasswordForm from "../../components/AppLayout/Account/PasswordChange";

const { Title, Text } = Typography;

export default function AccountView() {

  // Ejemlo de usuario
  const [user, setUser] = useState({
    name: "User Test",
    email: "correo@correo.com",
  });
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Guardar cambios de perfil
  const handleSave = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ ...user, ...values });
      setLoading(false);
    }, 1000);
  };

  // Cambiar contraseña
  const handlePasswordChange = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      passwordForm.resetFields();
      setLoading(false);
    }, 1000);
  };

  // Eliminar cuenta
  const handleDelete = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center py-12 px-2 transition-colors">
      <div className="w-full max-w-4xl">
        <Tabs
          defaultActiveKey="profile"
          items={[
            {
              key: "profile",
              label: (
                <span>
                  <UserOutlined /> Mi Cuenta
                </span>
              ),
              children: (
                <div className="flex flex-col items-center">
                  <Title level={1} className="!mb-0 !mt-8 !font-black text-center dark:text-white">
                    Mi Cuenta
                  </Title>
                  <Text type="secondary" className="mb-8 text-xl text-center dark:text-gray-300">
                    Aquí puedes actualizar tu información
                  </Text>
                  <ProfileForm
                    user={user}
                    loading={loading}
                    onSave={handleSave}
                    onDelete={() => setModalOpen(true)}
                    form={form}
                  />
                </div>
              ),
            },
            {
              key: "password",
              label: (
                <span>
                  <LockOutlined/> Cambiar Password
                </span>
              ),
              children: (
                <div className="flex flex-col items-center">
                  <Title level={2} className="!mb-0 !mt-8 !font-black text-center dark:text-white">
                    Cambiar contraseña
                  </Title>
                  <Text type="secondary" className="mb-8 text-xl text-center dark:text-gray-300">
                    Actualiza tu contraseña de acceso
                  </Text>
                  <PasswordForm
                    loading={loading}
                    onChange={handlePasswordChange}
                    form={passwordForm}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
      <Modal
        open={modalOpen}
        title="¿Eliminar cuenta?"
        okText="Sí, eliminar"
        okType="danger"
        cancelText="Cancelar"
        onOk={handleDelete}
        onCancel={() => setModalOpen(false)}
      >
        <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
      </Modal>
    </div>
  );
}