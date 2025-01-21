import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { auth } from '../config/firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Register with email/password
  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      })
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error)
      let errorMessage = 'Failed to create account'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already registered'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters'
      }
      toast.error(errorMessage)
      throw error
    }
  }

  // Login with email/password
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      let errorMessage = 'Failed to log in'
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password'
      }
      toast.error(errorMessage)
      throw error
    }
  }

  // Google Sign In
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Logged in with Google successfully!')
      navigate('/')
    } catch (error) {
      console.error('Google sign in error:', error)
      toast.error('Failed to sign in with Google')
      throw error
    }
  }

  // Facebook Sign In
  const facebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Logged in with Facebook successfully!')
      navigate('/')
    } catch (error) {
      console.error('Facebook sign in error:', error)
      toast.error('Failed to sign in with Facebook')
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      await signOut(auth)
      toast.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to log out')
      throw error
    }
  }

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    loading,
    register,
    login,
    googleSignIn,
    facebookSignIn,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 