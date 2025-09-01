export default function Page() {
  return (
    <>
      <header className="sr-only">OralVis Healthcare</header>
      <main className="mx-auto max-w-3xl px-6 py-8 md:px-16 md:py-12">
        <h1 className="text-[length:var(--text-h1)] font-semibold text-balance">OralVis Healthcare</h1>
        <p className="mt-2 text-[length:var(--text-body)] text-foreground">
          This project includes a React + Vite frontend and an Express + SQLite backend scaffold.
        </p>

        <section className="mt-6 space-y-3" aria-labelledby="structure-heading">
          <h2 id="structure-heading" className="text-[length:var(--text-h2)] font-medium text-balance">
            Project Structure
          </h2>
          <ul className="list-disc pl-5 text-[length:var(--text-body)] text-foreground">
            <li>
              <strong>/frontend</strong> — Vite + React Router + Tailwind + axios + jsPDF
            </li>
            <li>
              <strong>/backend</strong> — Express + sqlite3 + multer + Cloudinary + JWT + bcrypt
            </li>
            <li>
              <strong>README.md</strong> — setup, seed, and deployment instructions
            </li>
          </ul>
        </section>

        <section className="mt-6 space-y-3" aria-labelledby="quickstart-heading">
          <h2 id="quickstart-heading" className="text-[length:var(--text-h2)] font-medium text-balance">
            Quick Start
          </h2>
          <ol className="list-decimal pl-5 text-[length:var(--text-body)] space-y-2 text-foreground">
            <li>
              Backend:
              <pre className="mt-2 rounded-md bg-muted p-3 text-xs overflow-x-auto">
                {`cd backend
cp .env.example .env   # fill in JWT_SECRET, Cloudinary keys, FRONTEND_URL
npm install
npm run init
npm run seed
npm run dev   # http://localhost:4000`}
              </pre>
            </li>
            <li>
              Frontend:
              <pre className="mt-2 rounded-md bg-muted p-3 text-xs overflow-x-auto">
                {`cd frontend
cp .env.example .env.local   # set VITE_API_BASE_URL=http://localhost:4000
npm install
npm run dev   # http://localhost:5173`}
              </pre>
            </li>
            <li>Login with the seeded users (tech@oralvis.com / dentist@oralvis.com, password: password123).</li>
          </ol>
        </section>

        <section className="mt-6 space-y-3" aria-labelledby="routes-heading">
          <h2 id="routes-heading" className="text-[length:var(--text-h2)] font-medium text-balance">
            Routes & APIs
          </h2>
          <ul className="list-disc pl-5 text-[length:var(--text-body)] text-foreground">
            <li>POST /api/login — returns JWT with role</li>
            <li>POST /api/upload — Technician only (multipart image → Cloudinary + DB)</li>
            <li>GET /api/scans — Dentist only (list scans)</li>
          </ul>
        </section>

        <footer className="mt-8">
          <p className="text-xs text-foreground/90">
            See README.md for deployment notes (Vercel/Netlify for frontend, Render/Vercel for backend).
          </p>
        </footer>
      </main>
    </>
  )
}
