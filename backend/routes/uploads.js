const express = require("express")
const multer = require("multer")
const { authRequired, requireRole } = require("../middleware/auth")
const db = require("../db")
const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png"].includes(file.mimetype)
    cb(ok ? null : new Error("Only jpg/png allowed"), ok)
  },
})

const uploadBufferToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "oralvis/scans", resource_type: "image" },
      (err, result) => {
        if (err) reject(err)
        else resolve(result)
      },
    )
    stream.end(buffer)
  })

router.post("/upload", authRequired, requireRole("Technician"), upload.single("image"), async (req, res) => {
  try {
    const { patientName, patientId, scanType, region } = req.body || {}
    if (!patientName || !patientId || !scanType || !region) {
      return res.status(400).json({ error: "Missing required fields" })
    }
    if (!req.file) return res.status(400).json({ error: "Image file is required" })

    const uploadResult = await uploadBufferToCloudinary(req.file.buffer)
    const imageUrl = uploadResult.secure_url
    const uploadDate = new Date().toISOString()

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO scans (patientName, patientId, scanType, region, imageUrl, uploadDate)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [patientName, patientId, scanType, region, imageUrl, uploadDate],
        (err) => (err ? reject(err) : resolve()),
      )
    })

    return res.json({ success: true, imageUrl })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: "Upload failed" })
  }
})

module.exports = router
