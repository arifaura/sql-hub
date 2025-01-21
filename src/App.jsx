import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App 