import { useState } from "react";
import { Tabs, Modal, Typography, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ProfileForm from "../../components/AppLayout/Account/EditAccount";
import PasswordForm from "../../components/AppLayout/Account/PasswordChange";
import { useAuth } from "../../hooks/useAuth";
import { deleteAccount } from "../../services/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

export default function AccountView() {
  const { data } = useAuth();
  const user = {
    name: data?.name || "",
    lastName: data?.lastName || "",
    email: data?.email || ""
  };
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      toast.success(data);
      localStorage.removeItem("AUTH_TOKEN");
      window.location.href = "/auth/login";
    },
    onError: (error) => {
      toast.error(error.message);
      setDeletePassword("");
    },
  });

  // Eliminar cuenta usando la mutación
  const handleDelete = async () => {
    deleteAccountMutation.mutate({ currentPassword: deletePassword });
    setDeletePassword("");
    setModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className=" dark:bg-gray-950 flex flex-col items-center py-12 px-2 transition-colors"
    >
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <Title level={1} className="!mb-0 !mt-8 !font-black text-center dark:text-white">
                    Mi Cuenta
                  </Title>
                  <Text type="secondary" className="mb-8 text-xl text-center dark:text-gray-300">
                    Actualiza tu información personal y preferencias
                  </Text>
                  <ProfileForm
                    user={user}
                    loading={loading}
                    setLoading={setLoading}
                    onDelete={() => setModalOpen(true)}
                    form={form}
                  />
                </motion.div>
              ),
            },
            {
              key: "password",
              label: (
                <span>
                  <LockOutlined /> Cambiar Password
                </span>
              ),
              children: (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <Title level={2} className="!mb-0 !mt-8 !font-black text-center dark:text-white">
                    Cambiar contraseña
                  </Title>
                  <Text type="secondary" className="mb-8 text-xl text-center dark:text-gray-300">
                    Actualiza tu contraseña de acceso
                  </Text>
                  <PasswordForm
                    loading={loading}
                    setLoading={setLoading}
                    form={passwordForm}
                  />
                </motion.div>
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
        onCancel={() => {
          setModalOpen(false);
          setDeletePassword("");
        }}
        confirmLoading={loading}
      >
        <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
        <Input.Password
          placeholder="Contraseña actual"
          value={deletePassword}
          onChange={e => setDeletePassword(e.target.value)}
        />
      </Modal>
    </motion.div>
  );
}