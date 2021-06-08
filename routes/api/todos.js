const { v4: uuid4 } = require('uuid');

const createHash = require("crypto").createHash
const salt = require("crypto").randomBytes


const express = require('express');
const Todos = require('../../models/Todos');

// Setup request router for /todos
const router = express.Router();
router.get("/", (req, res) => {
    Todos.find()
        .then(tasks => res.status(200).json(tasks));
});

router.get("/:todosId", (req, res) => {
    Todos.find(todos => todos.todosId === req.body.todosId)
        .then(tasks => res.status(200).json(tasks));
});

router.post("/", (req, res) => {
    const sha256 = createHash('sha256');
    const new_tasks = req.body;
    new_tasks.forEach(task => {
        task.taskId = task.id;
        delete task.id;
    });
    
    delete new_tasks.id;
    const new_todos = {
        todosId: sha256.update(uuid4()).update(salt(4)).digest('hex').slice(0,8),
        createdOn: Date(),
        tasks: new_tasks
    };
    
    // console.log(req);
    Todos.create(new_todos
        , (err, task) => {
            if (err) {
                console.error("ERROR: Task not saved:", err);
                res.status(500);
            }
            else {
                res.status(200).json(task)
            } 
        }
    );
});

router.delete("/", (req, res) => {
    // console.log("delete requested");
    // res.status(200).json({success:true});
    
    Todos.deleteOne({ _id: req.query.id }
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

module.exports = router;