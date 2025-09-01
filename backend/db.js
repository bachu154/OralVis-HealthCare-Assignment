const path = require("path")
const fs = require("fs")
const sqlite3 = require("sqlite3").verbose()

const dataDir = path.join(__dirname, "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, "oralvis.db")
const db = new sqlite3.Database(dbPath)

module.exports = db
