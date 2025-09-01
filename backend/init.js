const db = require("./db")

const run = async () => {
  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('Technician','Dentist'))
      )`,
      (err) => (err ? reject(err) : resolve()),
    )
  })

  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientName TEXT NOT NULL,
        patientId TEXT NOT NULL,
        scanType TEXT NOT NULL,
        region TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        uploadDate TEXT NOT NULL
      )`,
      (err) => (err ? reject(err) : resolve()),
    )
  })

  console.log("DB initialized.")
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
