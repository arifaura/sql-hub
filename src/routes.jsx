import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Lessons from './pages/Lessons';
import SQLEditor from './pages/SQLEditor';
import ForgotPassword from './pages/ForgotPassword';
import Practice from './pages/Practice';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'lessons',
        element: <Lessons />
      },
      {
        path: 'sql-editor',
        element: <SQLEditor />
      },
      {
        path: 'practice',
        element: <Practice />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
]);

export default router; 