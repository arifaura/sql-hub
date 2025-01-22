import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { LessonsProvider } from './context/LessonsContext'
import { Toaster } from 'react-hot-toast'
import router from './routes'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LessonsProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </LessonsProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App 