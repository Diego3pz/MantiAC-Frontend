import { Form, Input, Button } from "antd";

interface PasswordFormProps {
  loading: boolean;
  onChange: (values: any) => void;
  form: any;
}

export default function PasswordForm({ loading, onChange, form }: PasswordFormProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow p-8 w-full max-w-2xl">
      <Form layout="vertical" form={form} onFinish={onChange}>
        <Form.Item
          label="Contraseña actual"
          name="currentPassword"
          rules={[{ required: true, message: "Ingresa tu contraseña actual" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nueva contraseña"
          name="newPassword"
          rules={[{ required: true, message: "Ingresa la nueva contraseña" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirmar nueva contraseña"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Confirma la nueva contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
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
          GUARDAR CONTRASEÑA
        </Button>
      </Form>
    </div>
  );
}