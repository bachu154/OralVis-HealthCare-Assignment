"use client"

import { useState } from "react"
import api from "../services/api.js"

export default function TechnicianDashboard() {
  const [patientName, setPatientName] = useState("")
  const [patientId, setPatientId] = useState("")
  const [scanType, setScanType] = useState("RGB")
  const [region, setRegion] = useState("Frontal")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    if (!patientName || !patientId || !scanType || !region || !image) {
      setMessage("Please complete all fields and select an image.")
      return
    }

    const form = new FormData()
    form.append("patientName", patientName)
    form.append("patientId", patientId)
    form.append("scanType", scanType)
    form.append("region", region)
    form.append("image", image)

    setLoading(true)
    try {
      await api.post("/api/upload", form, { headers: { "Content-Type": "multipart/form-data" } })
      setMessage("Upload successful!")
      setPatientName("")
      setPatientId("")
      setScanType("RGB")
      setRegion("Frontal")
      setImage(null)
    } catch (e) {
      setMessage(e?.response?.data?.error || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="px-6 py-8 md:px-16 md:py-12">
      <section className="space-y-6 max-w-3xl">
        <h1 className="text-[length:var(--text-h1)] font-semibold">Technician Dashboard</h1>

        <form onSubmit={onSubmit} className="bg-white border rounded-lg p-6 space-y-4" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium">
                Patient Name
              </label>
              <input
                id="patientName"
                name="patientName"
                className="mt-1 w-full rounded border px-3 py-2"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium">
                Patient ID
              </label>
              <input
                id="patientId"
                name="patientId"
                className="mt-1 w-full rounded border px-3 py-2"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="scanType" className="block text-sm font-medium">
                Scan Type
              </label>
              <select
                id="scanType"
                name="scanType"
                className="mt-1 w-full rounded border px-3 py-2"
                value={scanType}
                onChange={(e) => setScanType(e.target.value)}
              >
                <option value="RGB">RGB</option>
              </select>
            </div>
            <div>
              <label htmlFor="region" className="block text-sm font-medium">
                Region
              </label>
              <select
                id="region"
                name="region"
                className="mt-1 w-full rounded border px-3 py-2"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option>Frontal</option>
                <option>Upper Arch</option>
                <option>Lower Arch</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="scanImage" className="block text-sm font-medium">
                Scan Image (jpg/png)
              </label>
              <input
                id="scanImage"
                name="image"
                type="file"
                accept="image/jpeg,image/png"
                className="mt-1 w-full"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                aria-describedby="scanImageHelp"
                required
              />
              <p id="scanImageHelp" className="mt-1 text-xs text-gray-600">
                Maximum size 10MB. Supported formats: JPG, PNG.
              </p>
            </div>
          </div>

          {message && <p className="text-sm text-gray-700">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Scan"}
          </button>
        </form>
      </section>
    </main>
  )
}
