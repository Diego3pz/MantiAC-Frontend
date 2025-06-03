import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button } from "antd";
import type { UpdateCurrentUserPasswordForm } from "../../../types";
import { changePassword } from "../../../services/ProfileAPI";
import { toast } from "react-toastify";
import LoadingSpinner from "../../atoms/LoadingSpinner";
interface PasswordFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  form: any;
}

export default function PasswordForm({ loading, setLoading, form }: PasswordFormProps) {

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  })

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => {
    setLoading(true);
    mutate(formData, {
      onSettled: () => setLoading(false)
    });
  };

  if (loading) return <LoadingSpinner tip="Guardando cambios..." />;

  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow p-8 w-full max-w-2xl">
      <Form layout="vertical" form={form} onFinish={handleChangePassword}>
        <Form.Item
          label="Contraseña actual"
          name="currentPassword"
          rules={[{ required: true, message: "Ingresa tu contraseña actual" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nueva contraseña"
          name="password"
          rules={[{ required: true, message: "Ingresa la nueva contraseña" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirmar nueva contraseña"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Confirma la nueva contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full font-bold mt-4 bg-blue-600 border-gray-300 text-white hover:bg-gray-300 dark:!bg-gray-700 dark:!border-gray-700 dark:hover:!bg-gray-600 dark:!text-white"
        >
          Guardar contraseña
        </Button>
      </Form>
    </div>
  );
}