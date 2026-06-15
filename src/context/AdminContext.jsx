import { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)
const SESSION_KEY = 'so_admin'
const CREDS = { username: 'aayush', password: 'aayush@2026' }

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return localStorage.getItem(SESSION_KEY) === '1' } catch { return false }
  })

  const login = useCallback((username, password) => {
    if (username === CREDS.username && password === CREDS.password) {
      try { localStorage.setItem(SESSION_KEY, '1') } catch {}
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    try { localStorage.removeItem(SESSION_KEY) } catch {}
    setIsAdmin(false)
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be inside AdminProvider')
  return ctx
}
