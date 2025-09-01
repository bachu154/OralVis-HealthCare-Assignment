🦷 OralVis Healthcare – Full Stack Web Application

📖 Project Overview

OralVis Healthcare is a role-based full-stack web application designed for managing dental scan records.

Technicians: Upload patient scans with details.

Dentists: View uploaded scans, explore full-size images, and download reports as PDFs.

This project demonstrates authentication, role-based access control, database management, cloud file storage, backend APIs, and a React-based frontend.

🚀 Tech Stack

Frontend

React (Vite) – SPA for fast and interactive UI

React Router DOM – Navigation and protected routes

Axios – API requests

jsPDF – PDF generation

Backend

Node.js + Express.js – REST API server

SQLite – Lightweight relational database

bcryptjs – Password hashing

jsonwebtoken (JWT) – Authentication & session management

Multer – File handling

Cloudinary SDK – Cloud image storage

Hosting

Frontend → Netlify / Vercel

Backend → Render / Vercel

Database → SQLite (local file)

✨ Features

🔑 Authentication (RBAC)

Secure login using email + password

Role-based access:

Technician → Upload scans

Dentist → View scans

👩‍⚕️ Technician Dashboard

Upload form with:

Patient Name

Patient ID

Scan Type (e.g., RGB)

Region (Frontal / Upper Arch / Lower Arch)

Scan Image (JPG/PNG)

Image uploaded to Cloudinary

Data saved in SQLite

🦷 Dentist Dashboard

View all scans in table/grid layout

Details: Patient Name, ID, Scan Type, Region, Upload Date

Thumbnail + Full Image preview

Download PDF Report with patient details & embedded scan

📄 PDF Report

Patient Name & ID

Scan Type & Region

Upload Date

Embedded scan image

📂 Project Structure
oralvis-healthcare/
│── backend/              # Express + SQLite + Cloudinary
│   ├── index.js
│   ├── database.sqlite
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── .env.example
│
│── frontend/             # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
│
└── README.md

⚙️ Installation & Setup

🔧 Prerequisites

Node.js (v18+)

npm or yarn

Cloudinary account (for image storage)

1️⃣ Clone the Repository
git clone https://github.com/yourusername/oralvis-healthcare.git
cd oralvis-healthcare

2️⃣ Backend Setup
cd backend
npm install


Create .env file (based on .env.example):

PORT=5000
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Run backend server:

npm start

3️⃣ Frontend Setup
cd frontend
npm install


Create .env file (based on .env.example):

VITE_API_URL=http://localhost:5000


Run frontend dev server:

npm run dev

4️⃣ Default Test Credentials
👩‍🔬 Technician
Email: tech@oralvis.com
Password: 123456

🧑‍⚕️ Dentist
Email: dentist@oralvis.com
Password: 123456

🌍 Hosting

Backend → Render Deployment

Frontend → Netlify Deployment

🔗 Live Demo: https://oralvis-healthcare-demo.netlify.app

🔗 API Base URL: https://oralvis-backend.onrender.com

📸 Screenshots

Add screenshots after running the app. Suggested pages:

Login Page


Technician Dashboard (Upload Scan)


Dentist Dashboard (View Scans)


PDF Report Example


✅ Submission Checklist

 Source code (frontend + backend in one repo)

 Detailed README.md

 Hosted frontend + backend links

 Screenshots of key pages

 Default credentials provided
