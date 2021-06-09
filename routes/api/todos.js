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
    Todos.findOne({todosId: req.params.todosId}, { _id: 0, __v: 0 })
        .then(todos => {
            console.log(todos);
            res.status(200).json(todos);
        });
});


router.post("/", (req, res) => {
    const sha256 = createHash('sha256');
    const new_todos = req.body;
    new_todos.todosId = sha256.update(uuid4()).update(salt(4)).digest('hex').slice(0,8);
    new_todos.createdTime = Date();
    new_todos.updatedTime = Date();
    // new_todos.tasks.forEach(task => {
    //     task.taskId = task.id;
    //     delete task.id;
    // });
    
    // delete new_tasks.id;
    // const new_todos = {
    //     todosId: sha256.update(uuid4()).update(salt(4)).digest('hex').slice(0,8),
    //     createdOn: Date(),
    //     tasks: new_tasks
    // };
    console.log(new_todos);
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



module.exports = router;