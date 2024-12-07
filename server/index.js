require('dotenv').config

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const corsOptions = require("./config/cors");
const connectDB = require('./config/database')
const credentisls = require('./middleware/credentials');
const erorrHandlerMiddleware = require('./middleware/error_handler');

const app = express();
const PORT = 3080;

connectDB()

// Allowed credentials
app.use(credentisls)

// CORS
app.use(cors(corsOptions))

// application.x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// application/json response
app.use(express.json());

// middleware for cookies
app.use(cookieParser())

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Default error handler
app.use(erorrHandlerMiddleware)

// Routes
app.use('/api/auth', require('./routes/api/auth'));

app.all('*', (req, res) => {
    res.status(404)

    if(req.accepts('json')) {
        res.json({"error": "404 Not Found"})
    } else {
        res.type('text').send('404 Not Found');
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));