import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Header from "./components/Header.jsx"
import Login from "./pages/Login.jsx"
import TechnicianDashboard from "./pages/TechnicianDashboard.jsx"
import DentistDashboard from "./pages/DentistDashboard.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

export default function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === "/login"

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {!isAuthPage && <Header />}
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/technician"
            element={
              <ProtectedRoute role="Technician">
                <TechnicianDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dentist"
            element={
              <ProtectedRoute role="Dentist">
                <DentistDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  )
}
