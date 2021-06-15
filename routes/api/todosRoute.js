const { v4: uuid4 } = require('uuid');
const createHash = require("crypto").createHash
const salt = require("crypto").randomBytes

const express = require('express');
const router = express.Router();
const Todos = require('../../models/Todos');

/**
 * @route {GET} /todos/:todosId
 * @desc Get a todo list with given ID
 * @routeparam {String} :todosId is the ID of the requested todo list
 */
router.get("/:todosId", (req, res) => {
    Todos.findOne({ todosId: req.params.todosId }, { _id: 0, __v: 0, tasks: { _id: 0 } })
        .then(todos => {
            if (todos === undefined) {
                res.status(404);
            } else {
                res.status(200).json(todos);
            }
        });
});

/**
 * @route {POST} /todos
 * @desc Create a todo list
 */
router.post("/", (req, res) => {
    const sha256 = createHash('sha256');
    const new_todos = {
        tasks: req.body.tasks
    };
    new_todos.todosId = sha256.update(uuid4()).update(salt(4)).digest('hex').slice(0, 8);
    new_todos.createdTime = Date();
    new_todos.updatedTime = Date();
    Todos.create(new_todos
        , (err, task) => {
            if (err) {
                console.error("ERROR: Task not saved:", err);
                res.status(500);
            }
            else {
                res.status(200).json(new_todos)
            }
        }
    );
});

module.exports = router;