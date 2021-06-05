const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    desc: { type: String, required: true },
    isChecked: { type: Boolean, default: false },
});

module.exports = Task = mongoose.model("Task", TaskSchema, "TodoTasks");