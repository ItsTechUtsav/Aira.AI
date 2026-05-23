const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const interviewRoutes = require('./routes/interview.routes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://aira-ai-xi.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

// 404 handler (safe, no wildcard crash)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

module.exports = app;