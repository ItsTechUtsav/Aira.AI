const exprees = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');
const interviewRoutes = require('./routes/interview.routes');



const app = exprees();

app.use(exprees.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://aira-ai-xi.vercel.app',
    credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);



module.exports = app;