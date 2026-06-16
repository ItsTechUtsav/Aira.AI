# Aira.AI

Aira.AI is a full-stack interview practice platform with AI-powered question generation, answer evaluation, and performance reporting. It combines a React + Vite frontend with an Express + MongoDB backend and integrates with OpenRouter for AI-driven interview content.

## Project Structure

- `backend/`
  - `server.js` - backend server entrypoint
  - `src/app.js` - Express app setup with middleware and routes
  - `src/controllers/` - business logic for authentication and interview flows
  - `src/models/` - MongoDB schemas for users and interview sessions
  - `src/routes/` - API routes for auth and interview features
  - `src/db/db.js` - MongoDB connection helper
  - `src/services/openRouter.service.js` - OpenRouter AI service integration
  - `src/middlewares/auth.middleware.js` - JWT auth middleware

- `frontend/`
  - `src/App.jsx` - main React app component
  - `src/main.jsx` - React entrypoint and router setup
  - `src/routes/AppRoutes.jsx` - public and protected application routes
  - `src/routes/ProtectedRoute.jsx` - route guard for authenticated access
  - `src/pages/` - UI pages including Home, Login, Interview, History, Report, Dashboard, Analytics, Settings

## Key Features

- User authentication
  - register
  - login
  - get user profile
  - username updates
  - password verification and change
  - account deletion

- AI-driven interview flows
  - generate interview questions for a selected role, difficulty, and type
  - submit answers for timed questions
  - receive AI-generated feedback and scored evaluation
  - complete interviews and generate a summary report
  - view past interview history and individual reports

- Frontend pages
  - landing/home page
  - authentication page
  - protected dashboard experience
  - interview practice session
  - interview history
  - analytics
  - settings
  - report view

## Runtime Behavior

- Backend server runs on `http://://aira-ai-backend.onrender.com/`
- Frontend dev server runs on `http://localhost:5173`
- Backend CORS is configured for `http://localhost:5173`
- Protected API routes expect a `Bearer <token>` header
- Auth flow stores `user` and `token` in `localStorage`

## Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in `backend/` with the following values:

```env
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
OPENROUTER_API_KEY=<your-openrouter-api-key>
```

> Note: the backend currently uses a mock AI mode for interview question generation and evaluation. To enable real AI calls, update the `USE_MOCK` constant in `backend/src/controllers/interview.controller.js`.

### 3. Start the backend

```bash
cd backend
npm run dev
```

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

## Development Notes

- Authentication endpoints are under `POST /api/auth/*`
- Interview endpoints are under `POST /api/interview/*` and `GET /api/interview/*`
- `backend/src/services/openRouter.service.js` sends messages to `https://openrouter.ai/api/v1/chat/completions`
- The interview controller currently uses `USE_MOCK = true` and mock responses for evaluation and question generation

## Useful Scripts

### Backend

- `npm run dev` - start backend with nodemon

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - build production frontend assets
- `npm run preview` - preview the built frontend
- `npm run lint` - run ESLint checks

### Docker

- `frontend/dockerfile` is included for containerizing the frontend app
- Build a frontend image from the `frontend` directory with Docker

## Notes

- The frontend login/register form posts to `http://://aira-ai-backend.onrender.com//api/auth`
- Protected pages require a logged-in user stored in localStorage
- Interview sessions are saved in MongoDB and can be retrieved as history or report entries

## Future Enhancements

- add production environment setup and deployment guide
- complete AI integration by toggling `USE_MOCK` and handling OpenRouter prompts reliably
- improve error handling and user feedback on frontend
- add tests for backend controllers and frontend pages

## Contributors
Krishna Krishnatrey(FUll Stack Developer)

Shamit Gautam(AI Application Developer)

Utsav Sharma(DevOps Engg.)
