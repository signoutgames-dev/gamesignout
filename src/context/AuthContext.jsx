import { createContext, useContext, useEffect, useState } from 'react'
import { auth, signInWithGoogle, signOutUser, onAuthStateChanged, getRedirectResult } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = loading, null = signed out

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null))

    // When a mobile redirect flow completes, process the result explicitly.
    // onAuthStateChanged fires automatically too, but handling it here ensures
    // the user is set even if the listener fires before Firebase processes the redirect.
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) setUser(result.user)
      })
      .catch((err) => {
        const ignored = [
          'auth/popup-closed-by-user',
          'auth/cancelled-popup-request',
          'auth/operation-not-supported-in-this-environment',
        ]
        if (!ignored.includes(err.code)) console.error('Auth error:', err)
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
