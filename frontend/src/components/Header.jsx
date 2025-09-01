"use client"

import { Link, useNavigate } from "react-router-dom"
import { getRole, clearAuth } from "../utils/auth.js"

export default function Header() {
  const role = getRole()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate("/login")
  }

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-blue-700">
          OralVis Healthcare
        </Link>
        <nav className="flex items-center gap-3">
          {role === "Technician" && (
            <Link className="text-sm text-gray-700 hover:text-blue-700" to="/technician">
              Technician
            </Link>
          )}
          {role === "Dentist" && (
            <Link className="text-sm text-gray-700 hover:text-blue-700" to="/dentist">
              Dentist
            </Link>
          )}
          <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700">
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
