import { Navigate } from "react-router-dom"
import { getToken, getRole } from "../utils/auth.js"

export default function ProtectedRoute({ role, children }) {
  const token = getToken()
  const userRole = getRole()

  if (!token) return <Navigate to="/login" replace />
  if (role && userRole !== role) return <Navigate to="/login" replace />

  return children
}
