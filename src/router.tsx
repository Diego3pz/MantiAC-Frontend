import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import EquipmentView from './views/Equipment/EquipmentView'
import MaintenanceView from './views/MaintenanceView'
import ConfigurationView from './views/ConfigurationView'
import AccountView from './views/Account/AccountView'
import InformationView from './views/InformationView'
import NotFound from './views/NotFound'
import EquipmentCreateView from './views/Equipment/EquipmentCreateView'
import EquipmentDetailsView from './views/Equipment/EquipmentDetailsView'
import EquipmentEditView from './views/Equipment/EquipmentEditView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/equipments' element={<EquipmentView />} />
                    <Route path='/equipments/create' element={<EquipmentCreateView />} />
                    <Route path='/equipments/:equipmentId/edit' element={<EquipmentEditView />} />
                    <Route path='/equipments/:equipmentId' element={<EquipmentDetailsView />} />
                    <Route path='/maintenances' element={<MaintenanceView />} />
                    <Route path='/configuration' element={<ConfigurationView />} />
                    <Route path='/account' element={<AccountView />} />
                    <Route path='/informacion' element={<InformationView />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}