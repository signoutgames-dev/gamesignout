import { createContext, useContext, useEffect, useState } from 'react'
import { auth, signInWithGoogle, signOutUser, onAuthStateChanged, getRedirectResult } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = loading, null = signed out

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null))
    // Catch errors from mobile redirect flow (success is handled by onAuthStateChanged)
    getRedirectResult(auth).catch((err) => {
      if (err.code !== 'auth/popup-closed-by-user') console.error('Redirect auth error:', err)
    })
    return unsub
  }, [])

  const login = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      const ignored = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request']
      if (!ignored.includes(err.code)) console.error(err)
    }
  }

  const logout = async () => {
    await signOutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading: user === undefined }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
