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
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { auth, db } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize user collections
  const initializeUserCollections = async (uid, userData) => {
    try {
      // Initialize user stats
      await setDoc(doc(db, 'userStats', uid), {
        lessonsCompleted: 0,
        practiceProblems: 0,
        achievements: 0,
        totalQueries: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Create first activity
      await setDoc(doc(db, 'userActivity', `${uid}_join`), {
        userId: uid,
        type: 'account',
        title: 'Joined SQL Hub',
        timestamp: serverTimestamp()
      });

    } catch (error) {
      console.error('Error initializing user collections:', error);
      // Don't throw error as this is not critical for registration
    }
  };

  // Register with email/password
  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      })

      const userData = {
        uid: userCredential.user.uid,
        displayName: name,
        email: email,
        bio: '',
        location: '',
        website: '',
        notifications: {
          email: true,
          push: true,
          marketing: false
        },
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        provider: 'email'
      };

      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);

      // Initialize other collections
      await initializeUserCollections(userCredential.user.uid, userData);

      toast.success('Account created successfully!')
      return true
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
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      // Update last login time in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        lastLogin: serverTimestamp()
      }, { merge: true })

      // Add login activity
      await setDoc(doc(db, 'userActivity', `${result.user.uid}_${Date.now()}`), {
        userId: result.user.uid,
        type: 'account',
        title: 'Logged in',
        timestamp: serverTimestamp()
      });

      toast.success('Logged in successfully!')
      return true
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
      const result = await signInWithPopup(auth, provider)
      
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        bio: '',
        location: '',
        website: '',
        notifications: {
          email: true,
          push: true,
          marketing: false
        },
        lastLogin: serverTimestamp(),
        provider: 'google'
      };

      // Store or update user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), userData, { merge: true });

      // Initialize collections if first time
      const isNewUser = result.additionalUserInfo?.isNewUser;
      if (isNewUser) {
        await initializeUserCollections(result.user.uid, userData);
      } else {
        // Add login activity
        await setDoc(doc(db, 'userActivity', `${result.user.uid}_${Date.now()}`), {
          userId: result.user.uid,
          type: 'account',
          title: 'Logged in with Google',
          timestamp: serverTimestamp()
        });
      }

      toast.success('Logged in with Google successfully!')
      return true
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
      const result = await signInWithPopup(auth, provider)
      
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        bio: '',
        location: '',
        website: '',
        notifications: {
          email: true,
          push: true,
          marketing: false
        },
        lastLogin: serverTimestamp(),
        provider: 'facebook'
      };

      // Store or update user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), userData, { merge: true });

      // Initialize collections if first time
      const isNewUser = result.additionalUserInfo?.isNewUser;
      if (isNewUser) {
        await initializeUserCollections(result.user.uid, userData);
      } else {
        // Add login activity
        await setDoc(doc(db, 'userActivity', `${result.user.uid}_${Date.now()}`), {
          userId: result.user.uid,
          type: 'account',
          title: 'Logged in with Facebook',
          timestamp: serverTimestamp()
        });
      }

      toast.success('Logged in with Facebook successfully!')
      return true
    } catch (error) {
      console.error('Facebook sign in error:', error)
      toast.error('Failed to sign in with Facebook')
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      // Add logout activity before signing out
      if (user) {
        await setDoc(doc(db, 'userActivity', `${user.uid}_${Date.now()}`), {
          userId: user.uid,
          type: 'account',
          title: 'Logged out',
          timestamp: serverTimestamp()
        });
      }

      await signOut(auth)
      toast.success('Logged out successfully!')
      return true
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