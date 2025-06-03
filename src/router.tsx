import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import EquipmentView from './views/Equipment/EquipmentView'
import MaintenanceView from './views/Maintenance/MaintenanceView'
import ConfigurationView from './views/ConfigurationView'
import AccountView from './views/Account/AccountView'
import InformationView from './views/InformationView'
import NotFound from './views/NotFound'
import EquipmentCreateView from './views/Equipment/EquipmentCreateView'
import EquipmentDetailsView from './views/Equipment/EquipmentDetailsView'
import EquipmentEditView from './views/Equipment/EquipmentEditView'
import MaintenanceCreateView from './views/Maintenance/MaintenanceCreateView'
import MaintenanceEditView from './views/Maintenance/MaintenanceEditView'
import MaintenanceDetailsView from './views/Maintenance/MaintenanceDetailsView'
import PublicRoute from './components/PublicRoute/PublicRoute'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/Account/LoginView'
import RegisterView from './views/Account/RegisterView'
import ConfirmAccountView from './views/Account/ConfirmAccountView'
import RequestNewCodeView from './views/Account/RequestNewCodeView'
import ForgotPasswordView from './views/Account/ForgotPasswordView'
import NewPasswordView from './views/Account/NewPasswordView'
import { AnimatePresence } from "framer-motion";

export default function Router() {
    return (
        <BrowserRouter>
            <AnimatePresence mode="wait">
                <Routes>
                    {/* Rutas privadas */}
                    <Route element={<AppLayout />}>
                        <Route path='/' element={<DashboardView />} index />
                        <Route path='/equipments' element={<EquipmentView />} />
                        <Route path='/equipments/create' element={<EquipmentCreateView />} />
                        <Route path='/equipments/:equipmentId/edit' element={<EquipmentEditView />} />
                        <Route path='/equipments/:equipmentId' element={<EquipmentDetailsView />} />
                        <Route path='/equipments/:equipmentId/maintenance/create' element={<MaintenanceCreateView />} />
                        <Route path='/equipments/:equipmentId/maintenance/:maintenanceId/edit' element={<MaintenanceEditView />} />
                        <Route path='/maintenance/:maintenanceId/edit' element={<MaintenanceEditView />} />
                        <Route path='/maintenances' element={<MaintenanceView />} />
                        <Route path='/maintenances/:maintenanceId' element={<MaintenanceDetailsView />} />
                        <Route path='/equipments/:equipmentId/maintenance/:maintenanceId' element={<MaintenanceDetailsView />} />
                        <Route path='/configuration' element={<ConfigurationView />} />
                        <Route path='/account' element={<AccountView />} />
                        <Route path='/informacion' element={<InformationView />} />
                        <Route path='/404' element={<NotFound />} />
                    </Route>

                    {/* Rutas publicas */}
                    <Route element={<PublicRoute />}>
                        <Route element={<AuthLayout />}>
                            <Route path="/auth/login" element={<LoginView />} />
                            <Route path="/auth/register" element={<RegisterView />} />
                            <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                            <Route path="/auth/request-code" element={<RequestNewCodeView />} />
                            <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                            <Route path="/auth/new-password" element={<NewPasswordView />} />
                        </Route>
                    </Route>

                    {/* Ruta para páginas no encontradas */}
                    <Route element={<AuthLayout />}>
                        <Route path='/404' element={<NotFound />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </BrowserRouter>
    )
}