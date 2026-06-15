import { Navigate, Outlet } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export function AdminGuard() {
  const { isAdmin } = useAdmin()
  return isAdmin ? <Outlet /> : <Navigate to="/admin" replace />
}
