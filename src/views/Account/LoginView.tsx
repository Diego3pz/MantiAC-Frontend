import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { UserLoginForm } from "../../types";
import { authenticateUser } from "../../services/AuthAPI";

export default function LoginView() {

    const navigate = useNavigate()

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-2xl font-light text-white">
                Inicia sesión en tu cuenta y {''}
                <span className=" text-sky-500 font-bold"> gestiona tus equipos</span>
            </h1>


            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white mt-5"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-sky-600 hover:bg-gray-700 w-full p-3  text-white font-black  text-xl cursor-pointer transic"
                />
            </form>

            <nav className=" mt-10 flex flex-col space-y-4">
                <Link to={'/auth/register'} className="text-center text-gray-500">
                    <p className="text-center ">¿No tienes una cuenta?
                        {" "}
                        <span className="text-sky-600 font-black">Registrate</span>
                    </p>
                </Link>

                <Link to={'/auth/forgot-password'} className="text-center text-gray-500">
                    <p className="text-center ">¿Olvidaste tu contraseña?
                        {" "}
                        <span className="text-sky-600 font-black">Reestablecer</span>
                    </p>
                </Link>
            </nav>
        </>
    )
}