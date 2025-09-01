"use client"

import { useEffect, useState } from "react"
import api from "../services/api.js"
import { jsPDF } from "jspdf"

async function imageToDataUrl(url) {
  const res = await fetch(url, { mode: "cors" })
  const blob = await res.blob()
  return await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function DentistDashboard() {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api
      .get("/api/scans")
      .then((res) => {
        if (mounted) setScans(res.data.scans || [])
      })
      .catch((e) => setError(e?.response?.data?.error || "Failed to load scans"))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const downloadPdf = async (scan) => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" })
      const margin = 40
      let y = margin

      doc.setFontSize(16)
      doc.text("OralVis Healthcare - Scan Report", margin, y)
      y += 28

      doc.setFontSize(12)
      doc.text(`Patient Name: ${scan.patientName}`, margin, y)
      y += 18
      doc.text(`Patient ID: ${scan.patientId}`, margin, y)
      y += 18
      doc.text(`Scan Type: ${scan.scanType}`, margin, y)
      y += 18
      doc.text(`Region: ${scan.region}`, margin, y)
      y += 18
      doc.text(`Upload Date: ${formatDate(scan.uploadDate)}`, margin, y)
      y += 24

      const dataUrl = await imageToDataUrl(scan.imageUrl)
      // Detect format from data URL for jsPDF
      const format = typeof dataUrl === "string" && dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG"
      const pageWidth = doc.internal.pageSize.getWidth()
      const maxImgWidth = pageWidth - margin * 2

      doc.addImage(dataUrl, format, margin, y, maxImgWidth, 0)

      doc.save(`scan-${scan.id}.pdf`)
    } catch (e) {
      alert("Failed to generate PDF.")
    }
  }

  if (loading) return <p role="status">Loading scans...</p>
  if (error)
    return (
      <p className="text-red-600" role="alert">
        {error}
      </p>
    )

  return (
    <main className="px-6 py-8 md:px-16 md:py-12">
      <section className="space-y-6">
        <h1 className="text-[length:var(--text-h1)] font-semibold text-balance">Dentist Dashboard</h1>

        {scans.length === 0 ? (
          <p className="text-foreground">No scans yet.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {scans.map((scan) => (
              <article
                key={scan.id}
                className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md"
                aria-label={`Scan ${scan.id} for ${scan.patientName}`}
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-neutral-800">
                  <img
                    src={scan.imageUrl || "/placeholder.svg?height=300&width=400&query=dental%20scan%20preview"}
                    alt={`Dental scan preview for ${scan.patientName}, ${scan.scanType} - ${scan.region}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 space-y-1 text-[16px] text-foreground">
                  <p className="font-medium">
                    {scan.patientName} (ID: {scan.patientId})
                  </p>
                  <p>Type: {scan.scanType}</p>
                  <p>Region: {scan.region}</p>
                  <p className="text-foreground/70">Uploaded: {formatDate(scan.uploadDate)}</p>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      href={scan.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View full image for ${scan.patientName}`}
                    >
                      View Full Image
                    </a>
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Download PDF report for ${scan.patientName}`}
                      onClick={() => downloadPdf(scan)}
                    >
                      Download PDF Report
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
