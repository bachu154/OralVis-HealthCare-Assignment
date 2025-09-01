const express = require("express")
const { authRequired, requireRole } = require("../middleware/auth")
const db = require("../db")

const router = express.Router()

router.get("/scans", authRequired, requireRole("Dentist"), (req, res) => {
  db.all(
    `SELECT id, patientName, patientId, scanType, region, imageUrl, uploadDate
     FROM scans
     ORDER BY datetime(uploadDate) DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" })
      return res.json({ scans: rows || [] })
    },
  )
})

module.exports = router
