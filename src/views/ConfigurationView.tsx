import { Card, Switch } from "@tremor/react";
import { useEffect, useState } from "react";
import { useDarkMode } from '../context/DarkModeContext'

function ConfigurationView() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <Card className="bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <h2 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">Preferencias de la aplicación</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-200">Tema oscuro</span>
          <Switch checked={darkMode} onChange={setDarkMode} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-200">Notificaciones por correo</span>
          <Switch checked={notifications} onChange={setNotifications} />
        </div>
      </Card>
    </div>
  );
}

export default ConfigurationView;