const db = require("./db")
const bcrypt = require("bcryptjs")

const users = [
  { email: "tech@oralvis.com", password: "password123", role: "Technician" },
  { email: "dentist@oralvis.com", password: "password123", role: "Dentist" },
]

const upsertUser = async ({ email, password, role }) => {
  const hashed = await bcrypt.hash(password, 10)

  const existing = await new Promise((resolve, reject) => {
    db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => (err ? reject(err) : resolve(row)))
  })

  if (existing) {
    console.log(`User exists: ${email}`)
    return
  }

  await new Promise((resolve, reject) => {
    db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, hashed, role], (err) =>
      err ? reject(err) : resolve(),
    )
  })

  console.log(`Seeded user: ${email} (${role})`)
}
;(async () => {
  try {
    for (const u of users) {
      await upsertUser(u)
    }
    console.log("Seeding complete.")
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
