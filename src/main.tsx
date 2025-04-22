import { MaterialTailwindControllerProvider } from '@/context'
import { ThemeProvider } from '@material-tailwind/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../public/css/tailwind.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { AlertModalProvider } from './providers/use-alert-modal'

// Definindo tipo para as props do ThemeProvider (se necessário)
interface ThemeProviderProps {
  children: React.ReactNode
  // Adicione outras props específicas do ThemeProvider se aplicável
}

const RootComponent: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <ToastContainer />
            <AlertModalProvider>
              <App />
            </AlertModalProvider>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

// Renderização segura com verificação de elemento root
const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RootComponent />)
} else {
  console.error("Element with id 'root' not found in the document.")
}
