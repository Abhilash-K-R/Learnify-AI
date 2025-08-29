import { Navigate } from 'react-router-dom'
import { getState } from '../lib/storage'

export default function ProtectedRoute({ children }) {
  const { user } = getState()
  if (!user) return <Navigate to="/auth" replace />
  return children
}
