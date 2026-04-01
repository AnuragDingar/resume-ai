const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
// require all routes here
const authRouter = require('./routes/auth.routes');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

module.exports = app;