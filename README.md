# MantiAC - Frontend

Interfaz de usuario del sistema de gestión de mantenimiento de aires acondicionados. Este frontend está construido con **React + TypeScript**, usa **Vite** como bundler, y está estilizado con **Tailwind CSS**. Se conecta con la API REST del backend para gestionar equipos, mantenimientos y técnicos.

## 🧰 Tecnologías Principales

- ⚛️ React 18 + TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS + Ant Design
- 🌐 React Router DOM v7
- 📦 React Query + DevTools
- 🧾 React PDF Renderer
- 📋 React Hook Form + Zod
- 🔥 Framer Motion
- 🔔 React Toastify
- 📊 Tremor UI
- 📡 Axios
- 🧪 ESLint + Prettier
- 🔍 Remix Icons

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz con:

```env
VITE_API_URL=http://localhost:4000/api
```

## 📦 Instalación

```bash
git clone https://github.com/Diego3pz/MantiAC-Frontend.git
cd MantiAC-Frontend
npm install
```

## 🧪 Comandos Útiles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Compilar para producción
npm run lint      # Revisar el código con ESLint
npm run preview   # Previsualizar la build de producción
```

## 🗂️ Estructura del Proyecto

```
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── App.tsx
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Despliegue

El proyecto puede ser desplegado fácilmente en plataformas como **Vercel** o **Netlify**.

## 📄 Licencia

Diego Espinoza
