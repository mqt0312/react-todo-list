// Import the backend stuff
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
require('dotenv').config();

const logger = require('./logger');


// Import the Express routers
const todos_router = require('./routes/api/todosRoute')

// Initial app configuration
const app = express();
app.use(body_parser.json());
app.use("/todos", todos_router);

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info("MongoDB connected."))
    .catch(err => logger.error("ERROR: Database not connected:", err));

// Setup listening port 
const port = process.env.PORT || 5000;
app.listen(port, () => logger.info("Server started on port", port));