"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api.js"
import { setAuth } from "../utils/auth.js"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }

    setLoading(true)
    try {
      const res = await api.post("/api/login", { email, password })
      const { token, role } = res.data
      setAuth(token, role)
      navigate(role === "Technician" ? "/technician" : "/dentist", { replace: true })
    } catch (e) {
      setError(e?.response?.data?.error || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="px-6 py-8 md:px-16 md:py-12">
      <section className="max-w-md mx-auto">
        <h1 className="text-[length:var(--text-h1)] md:text-[length:var(--text-h1)] text-2xl font-semibold text-center mb-6">
          Sign in to OralVis
        </h1>

        <form
          onSubmit={onSubmit}
          className="bg-white border rounded-lg p-6 space-y-4"
          aria-describedby={error ? "login-error" : undefined}
          noValidate
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!error && !email ? "true" : "false"}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={!!error && !password ? "true" : "false"}
              required
            />
          </div>

          {error && (
            <p id="login-error" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-xs text-gray-500">
            Test users: tech@oralvis.com / dentist@oralvis.com (password: password123)
          </p>
        </form>
      </section>
    </main>
  )
}
