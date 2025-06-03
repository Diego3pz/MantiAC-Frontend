import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../../services/ProfileAPI";
import { toast } from "react-toastify";
import type { UserProfileForm } from "../../../types";
import LoadingSpinner from "../../atoms/LoadingSpinner";

interface ProfileFormProps {
    user: { name: string; lastName: string; email: string };
    loading: boolean;
    setLoading: (loading: boolean) => void;
    onDelete: () => void;
    form: any;
}

export default function ProfileForm({ user, loading, setLoading, onDelete, form }: ProfileFormProps) {

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => {
        setLoading(true);
        mutate(formData, {
            onSettled: () => setLoading(false)
        });
    };

    if (loading) return <LoadingSpinner tip="Guardando cambios..." />;

    return (
        <div className="bg-white dark:bg-gray-900 rounded shadow p-8 w-full max-w-2xl">
            <Form
                layout="vertical"
                form={form}
                initialValues={user}
                onFinish={handleEditProfile}
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: "El nombre es obligatorio" }]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    label="Apellido"
                    name="lastName"
                    rules={[{ required: true, message: "El apellido es obligatorio" }]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    label="E-Mail"
                    name="email"
                    rules={[
                        { required: true, message: "El correo es obligatorio" },
                        { type: "email", message: "Correo inválido" },
                    ]}
                >
                    <Input prefix={<MailOutlined />} />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full font-bold mt-4 bg-blue-600 border-gray-300 text-white hover:bg-gray-300 dark:!bg-gray-700 dark:!border-gray-700 dark:hover:!bg-gray-600 dark:!text-white"
                >
                    Guardar cambios
                </Button>
            </Form>
            <Button
                danger
                icon={<DeleteOutlined />}
                className="w-full mt-6 !bg-red-800 !border-red-800 hover:!bg-red-700 !text-white"
                onClick={onDelete}
            >
                Eliminar cuenta
            </Button>
        </div>
    );
}