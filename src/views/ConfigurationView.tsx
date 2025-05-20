import { Card, Switch, Select, SelectItem } from "@tremor/react";
import { useState } from "react";

function ConfigurationView() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("es");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <Card>
        <h2 className="font-semibold mb-4">Preferencias de la aplicación</h2>
        <div className="flex items-center justify-between mb-4">
          <span>Tema oscuro</span>
          <Switch checked={darkMode} onChange={setDarkMode} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span>Idioma</span>
          <Select value={language} onValueChange={setLanguage} className="w-32">
            <SelectItem value="es" className="cursor-pointer">Español</SelectItem>
            <SelectItem value="en" className="cursor-pointer">Inglés</SelectItem>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <span>Notificaciones por correo</span>
          <Switch checked={notifications} onChange={setNotifications} />
        </div>
      </Card>
    </div>
  );
}

export default ConfigurationView;