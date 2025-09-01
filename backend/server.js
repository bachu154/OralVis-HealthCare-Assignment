require("dotenv").config()
const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const uploadRoutes = require("./routes/uploads")
const scansRoutes = require("./routes/scans")

const app = express()

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: false,
  }),
)
app.use(express.json())

app.get("/api/health", (_req, res) => res.json({ ok: true }))

app.use("/api", authRoutes)
app.use("/api", uploadRoutes)
app.use("/api", scansRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`OralVis backend running on http://localhost:${port}`)
})
