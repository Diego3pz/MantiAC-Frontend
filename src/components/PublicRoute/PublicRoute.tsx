import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PublicRoute() {
    const { data: user } = useAuth();

    // Si el usuario está autenticado, redirige a la página principal
    if (user) {
        return <Navigate to="/" />;
    }

    // Si no está autenticado, renderiza la ruta pública
    return <Outlet />;
}