const exprees = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');


const app = exprees();
app.use(exprees.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use('/api/auth', authRoutes);

module.exports = app;