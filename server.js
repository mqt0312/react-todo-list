// Import the backend stuff
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
require('dotenv').config();

// Import the Express routers
const todos_router = require('./routes/api/todosRoute')

// Initial app configuration
const app = express();
app.use(body_parser.json());
app.use("/todos", todos_router);

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected."))
    .catch(err => console.error("ERROR: Database not connected:", err));

// Setup listening port 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port", port));