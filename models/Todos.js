const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
    todosId: { type: String, required: true },
    createdTime: { type: Date, required: true },
    updatedTime: { type: Date, required: true },
    tasks: [
        {
            title: { type: String, required: true },
            checked: { type: Boolean, default: false },
            taskId: { type: String, required: true }
        }
    ]
});

module.exports = Todos = mongoose.model("Todos", TodosSchema, "TodosBin");