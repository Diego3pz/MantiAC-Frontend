import { Card, Switch } from "@tremor/react";
import { useEffect, useState } from "react";
import { useDarkMode } from '../context/DarkModeContext'
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotifications } from "../services/AuthAPI";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ConfigurationView() {
  const { darkMode, setDarkMode } = useDarkMode();
  const { data: user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const queryClient = useQueryClient();

  const { mutate: mutateNotifications } = useMutation({
    mutationFn: updateNotifications,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast.error(error.message);
      setNotifications((prev) => !prev);
    }
  });

  useEffect(() => {
    if (user) setNotifications(user.notificationsEnabled);
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    mutateNotifications(checked);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl mx-auto mt-8 space-y-6"
    >
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors">
          <h2 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">Preferencias de la aplicación</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-200">Tema oscuro</span>
            <Switch checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Notificaciones por correo</span>
            <Switch checked={notifications} onChange={handleNotificationsChange} />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default ConfigurationView;