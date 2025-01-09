require('dotenv').config()

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
    .then(() => {
        mongoose.connection.once('open', () => {
            console.log('DB connected');
            app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
        });
    })
    .catch(error => {
        console.error('Failed to connect to DB:', error);
        process.exit(1); // Jarayonni to'xtatish
    });

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
    // res.status(404)

    if(req.accepts('json')) {
        res.json({"error": "404 Not Found"})
    } else {
        res.type('text').send('404 Not Found DATA');
    }
})

mongoose.connection.once('open', () => {
    console.log('DB connected')
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})