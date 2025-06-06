import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ForgotPasswordForm } from "../../types";
import { forgotPasssword } from "../../services/AuthAPI";
import { motion } from "framer-motion";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPasssword,
        onSuccess: (data) => {
            toast.success(data)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleForgotPassword = (formData: ForgotPasswordForm) => {
        mutate(formData)
    }


    return (
        <>
            <motion.p
                className="text-2xl font-light text-white mt-5"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                Llena el formulario para {''}
                <span className=" text-sky-500 font-bold"> reestablecer tu password</span>
            </motion.p>
            <motion.form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10  bg-white mt-5"
                noValidate
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
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

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-sky-600 hover:bg-sky-700 w-full p-3  text-white font-black  text-xl cursor-pointer transition-colors"
                />
            </motion.form>

            <motion.nav
                className=" mt-10 flex flex-col space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <Link to={'/auth/login'} className="text-center text-gray-500">
                    <p className="text-center">
                        ¿Ya tienes una cuenta? {''}
                        <span className="text-sky-600 font-black">Inicia Sesión</span>
                    </p>
                </Link>

                <Link to={'/auth/register'} className="text-center text-gray-500">
                    <p className="text-center ">¿No tienes una cuenta?
                        {" "}
                        <span className="text-sky-600 font-black">Registrate</span>
                    </p>
                </Link>
            </motion.nav>
        </>
    )
}
