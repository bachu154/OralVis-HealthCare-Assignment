# OralVis Healthcare

Full-stack web app with two user roles:
- Technician: upload patient dental scans
- Dentist: view scans and generate per-scan PDF reports

Tech stack:
- Frontend: React (Vite), React Router, axios, Tailwind CSS, jsPDF
- Backend: Node.js, Express, SQLite (sqlite3), bcryptjs, jsonwebtoken, multer, Cloudinary SDK, cors, dotenv

## Features

- JWT authentication (POST /api/login) with roles in payload { id, role }
- Technician dashboard: upload scan image + metadata to /api/upload (multipart/form-data) → stored in Cloudinary, record in SQLite
- Dentist dashboard: view scans (GET /api/scans), view full image, download a PDF report with image + metadata
- Protected routing: only allow access if JWT role matches page

---

## Quick Start

### 1) Backend

1. Copy backend/.env.example to backend/.env and fill values:
   - JWT_SECRET=your_long_random_secret
   - CLOUDINARY_CLOUD_NAME=...
   - CLOUDINARY_API_KEY=...
   - CLOUDINARY_API_SECRET=...
   - FRONTEND_URL=http://localhost:5173

2. Install and initialize:
   \`\`\`
   cd backend
   npm install
   npm run init     # creates tables if not exist
   npm run seed     # creates default users
   npm run dev      # starts server on http://localhost:4000
   \`\`\`

Default test users:
- Technician: tech@oralvis.com / password123
- Dentist: dentist@oralvis.com / password123

### 2) Frontend

1. Create frontend/.env.local or copy .env.example to .env.local and adjust if needed:
   \`\`\`
   VITE_API_BASE_URL=http://localhost:4000
   \`\`\`

2. Install and run:
   \`\`\`
   cd frontend
   npm install
   npm run dev      # opens http://localhost:5173
   \`\`\`

### 3) Test Flow

- Login as Technician → upload a scan (jpg/png). You should see a success message.
- Login as Dentist → see scans list (thumbnail, metadata), view full image, and download a PDF report.

---

## Deployment Notes

- Frontend: deploy to Vercel or Netlify (static Vite build)
- Backend: deploy to Render or Vercel (Node server). If using Vercel for serverless, adapt Express to API routes; Render is simpler for a persistent Express server.
- CORS: set FRONTEND_URL in backend .env to your deployed frontend origin (e.g., https://oralvis.example.com)

---

## Scripts

Backend:
- `npm run dev` - start dev server on port 4000
- `npm run init` - initialize SQLite schema
- `npm run seed` - seed default users

Frontend:
- `npm run dev` - Vite dev
- `npm run build` - production build
- `npm run preview` - preview build

---

## Database

SQLite file: backend/data/oralvis.db

Tables:
- users(id, email, password, role)
- scans(id, patientName, patientId, scanType, region, imageUrl, uploadDate)
