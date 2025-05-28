import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider, theme } from 'antd'
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext'

const queryClient = new QueryClient()

function AppWithAntdTheme() {
  const { darkMode } = useDarkMode()

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Router />
      <ReactQueryDevtools />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <AppWithAntdTheme />
      </DarkModeProvider>
    </QueryClientProvider>
  </StrictMode>,
)