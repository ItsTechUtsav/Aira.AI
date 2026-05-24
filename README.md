# Aira.AI

**Aira.AI** is a full-stack interview preparation platform built with React, Vite, Express, MongoDB, and OpenRouter AI. It helps candidates generate practice interviews, submit answers, and review performance with feedback reports.

---

## 🚀 Project Overview

Aira.AI allows users to:

- Generate interview questions by role, difficulty, and question type
- Submit answers and receive scoring and feedback
- Review interview history and detailed reports
- Access protected pages via JWT-secured authentication

---

## 🌐 Deployment

- Frontend ready for **Vercel** deployment
- Backend built with **Express + MongoDB** and exposes REST endpoints
- AI features integrate with **OpenRouter** but use a mock fallback by default

> Add your deployed live URL here once available.

---

## 🎯 Core Features

- **Authentication**
  - Register and login with username/email
  - JWT-based protected routes
  - Change username, verify password, change password, delete account

- **Interview Practice**
  - Generate five interview questions matched to role, difficulty, and type
  - Submit answers with automatic time-limit and scoring checks
  - Finish interviews to calculate final score, summary, strengths, and weaknesses

- **History & Reporting**
  - View previous interview sessions
  - See detailed report pages for each completed interview
  - Track performance status such as Excellent, Good, Average, or Needs Improvement

---

## 🧩 Tech Stack

- Frontend: `React`, `Vite`, `React Router`, `Tailwind CSS`, `Framer Motion`
- Backend: `Node.js`, `Express`, `MongoDB`, `Mongoose`, `jsonwebtoken`, `bcryptjs`
- AI / API: `Axios`, `OpenRouter` service
- Dev tools: `ESLint`, `nodemon`

---

## 📁 Project Structure

- `backend/`
  - `server.js` — backend server entrypoint
  - `src/app.js` — Express app, middleware, and CORS config
  - `src/controllers/` — auth and interview controllers
  - `src/db/db.js` — MongoDB connection helper
  - `src/db/models/` — `user.model.js` and `interview.model.js`
  - `src/services/openRouter.service.js` — OpenRouter AI helper
  - `src/middlewares/auth.middleware.js` — JWT auth middleware
  - `src/routes/` — `auth.routes.js` and `interview.routes.js`

- `frontend/`
  - `src/main.jsx` — React entrypoint
  - `src/App.jsx` — app shell
  - `src/routes/AppRoutes.jsx` — public and protected routes
  - `src/routes/ProtectedRoute.jsx` — auth guard for protected pages
  - `src/pages/` — Home, Login, Interview, History, Analytics, Report, Settings, Dashboard, Session
  - `public/` — static files and metadata
  - `dockerfile` — optional frontend containerization

---

## 🔌 Backend API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/change-username`
- `POST /api/auth/verify-password`
- `PUT /api/auth/change-password`
- `DELETE /api/auth/delete-account`

### Interview

- `POST /api/interview/generate-questions`
- `POST /api/interview/submit-answer`
- `POST /api/interview/finish`
- `GET /api/interview/my-interviews`
- `GET /api/interview/report/:id`

> Protected routes require an `Authorization: Bearer <token>` header.

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```


### 2. Run backend locally

```bash
cd backend
npm run dev
```

### 3. Run frontend locally

```bash
cd frontend
npm run dev
```

---

## 📝 Notes

- Backend CORS allows `http://localhost:5173` and `https://aira-ai-xi.vercel.app`.
- AI routes currently use `USE_MOCK = true` in `backend/src/controllers/interview.controller.js`.
- The AI helper sends requests to `https://openrouter.ai/api/v1/chat/completions` using `openai/gpt-4o-mini`.
- Frontend protection is handled by `frontend/src/routes/ProtectedRoute.jsx` with `localStorage.user`.

---

## 🎨 Recruiter Visual Preview

1: Landing / Home Page -->
<img width="1900" height="972" alt="image" src="https://github.com/user-attachments/assets/ad27c764-de0d-420f-89f6-fdb384c9abc8" />


2: Interview Practice Session -->
<img width="1357" height="904" alt="image" src="https://github.com/user-attachments/assets/e3905b3d-064d-4095-baab-4ef6d4dd8ad6" />


3: Report / Analytics -->
<img width="1210" height="794" alt="image" src="https://github.com/user-attachments/assets/d65e2805-ac56-47fc-8a59-4c823f382fd0" />

---

## 👥 Team

- Krishna Krishnatrey — Full Stack Developer
- Shamit Gautam — AI and Backend Engineer
- Utsav Sharma — DevOps Engineer

---

## 📌 Future Enhancements

- Enable live AI question generation by setting `USE_MOCK = false`
- Add end-to-end and unit tests
- Add backend production deployment and CI/CD docs
- Improve UX with richer session analytics and feedback flow
