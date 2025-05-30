import { useState } from "react"
import type { ConfirmToken } from "../../types"
import NewPasswordToken from "../../components/AuthLayout/NewPasswordToken"
import NewPasswordForm from "../../components/AuthLayout/NewPasswordForm"


export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            {!isValidToken ?
                <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
                :
                <NewPasswordForm token={token} />
            }
        </>
    )
}
