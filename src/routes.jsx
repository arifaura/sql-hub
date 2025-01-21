import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Lessons from './pages/Lessons'
import Quizzes from './pages/Quizzes'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import Layout from './components/layout/Layout'
import NotFound from './pages/NotFound'
import Practice from './pages/Practice'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes 