// Punto de entrada principal de la aplicación React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Material UI — proveedor de tema global y estilos base
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

// Componente raíz de la aplicación
import App from './App.jsx'

// Renderizamos la app dentro de StrictMode para detectar problemas potenciales
// ThemeProvider aplica el tema personalizado (colores dorados, fondo oscuro, tipografía)
// CssBaseline normaliza los estilos CSS del navegador para consistencia
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
