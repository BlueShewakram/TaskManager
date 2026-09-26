import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading, isDemo } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="animate-pulse text-slate-500 font-medium">Loading TaskFlow…</div>
      </div>
    )
  }
  // Demo mode auto-logs in, Supabase mode requires login
  if (!isDemo && !user) return <Navigate to="/login" replace />
  return children
}
