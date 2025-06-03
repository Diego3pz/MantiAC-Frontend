import { useState } from "react"
import type { ConfirmToken } from "../../types"
import NewPasswordToken from "../../components/AuthLayout/NewPasswordToken"
import NewPasswordForm from "../../components/AuthLayout/NewPasswordForm"
import { motion, AnimatePresence } from "framer-motion"


export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <AnimatePresence mode="wait">
            {!isValidToken ? (
                <motion.div
                    key="token"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
                </motion.div>
            ) : (
                <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <NewPasswordForm token={token} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
