// Import the backend stuff
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
require('dotenv').config();

// Initial app configuration
const app = express();
app.use(body_parser.json());

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected."))
    .catch(err => console.error("ERROR: Database not connected:", err));

// Import data model
const Task = require("./models/Task");

// Setup request router
const router = express.Router();
router.get("/", (req, res) => {
    Task.find()
        .then(tasks => res.status(200).json(tasks));
});

router.post("/", (req, res) => {
    Task.create({ desc: req.body.desc }
        , (err, task) => {
            if (err) {
                console.error("ERROR: Task not saved:", err);
                res.status(500);
            }
            else {
                console.log("Task saved");
                console.log(task);
                res.status(200).json(task)
            } 
        }
    );
});


router.delete("/", (req, res) => {
    // console.log("delete requested");
    // res.status(200).json({success:true});
    
    Task.deleteOne({ _id: req.query.id }
        , err => {
            if (err) {
                console.error("ERROR: Task not deleted:", err);
                res.status(400).json({ success: false, err: err });
            }
            else {
                console.log("Task deleted");
                res.status(200).json({ success: true })
            }
        }
    );
});

app.use("/todos", router);

// Setup listening port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port", port));