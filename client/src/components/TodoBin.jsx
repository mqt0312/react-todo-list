import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import './TodoBin.css'

import store from '../redux/store'
import { addTask, checkTask, deleteTask, saveTodos, loadTodos } from '../redux/slices/todosSlice'

const TodoBin = (props) => {
    
    const status = useSelector(state => state.todos.status);
    const errmsg = useSelector(state => state.todos.errmsg);
    const { todosId } = useParams();
    React.useEffect(() => {
        if (todosId !== undefined) {
            store.dispatch(loadTodos(todosId));
        }
    }, []);

    if (!props.todos.tasks | status === 'error') {
        return (
            <div class="alert alert-danger text-center" role="alert">
                {errmsg || "Error"}
            </div>
        )
    } else {
        const shareableUrl = props.todos.status === "saved" ?
            <div class="alert alert-primary" role="alert">
                Here's your shareable URL:
                <div className="url-clipboard bg-light p-2 text-center mt-2">
                    {window.location.origin + "/todos/" + props.todos.todosId}
                </div>
            </div>
            : null;

        return (
            <div className="container-fluid my-3">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form onSubmit={taskSubmitHandler}>
                            <input type="text" className="form-control" placeholder="New Task" />
                        </form>
                    </div>
                </div>

                {status === "busy" && (
                    <div className="row justify-content-center m-3">
                    <div className="col-1">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                )}

                <div className="row justify-content-center">
                    <div className="col-6 mt-2">
                        <ul className="list-group">
                            {props.todos.tasks.map(task => (
                                <ContextMenuTrigger id="todo-contextmenu" key={task.taskId}>
                                    <li data-taskid={task.taskId.toString()} className="list-group-item list-group-item-action d-flex justify-content-left">
                                        {console.log(task)}
                                        <input className="form-check-input me-1" id={task.taskId} type="checkbox" checked={task.checked} onChange={() => checkHandler(task.taskId)} />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            {task.title}
                                        </label>
                                    </li>
                                </ContextMenuTrigger>
                            ))}
                            <ContextMenu id="todo-contextmenu">
                                <MenuItem data={{ type: "delete" }} onClick={(e, data, elem) => deleteHandler(elem.children[0].dataset.taskid)}>
                                    Delete
                                </MenuItem>
                            </ContextMenu>
                        </ul>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-6 mt-2">
                        {shareableUrl}
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-6 mt-2 d-grid">
                        <button className="btn btn-primary" onClick={() => store.dispatch(saveTodos(props.todos))}>
                            Save
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

/**
 * Task submission handler
 * @name taskSubmitHandler
 * @desc Record new task and dispatch the task-creation action to the Redux store
 * @param {Event} e The event passed from the browser
 */
const taskSubmitHandler = e => {
    e.preventDefault()
    const input_elem = e.target[0];
    if (!(input_elem.value === "")) {
        const input_text = input_elem.value;
        input_elem.value = "";
        const new_task = {
            title: input_text,
            checked: false
        }
        store.dispatch(addTask(new_task));
    }
}

/**
 * Task checking handler
 * @name checkHandler
 * @desc Dispatch the task-checking action with the requested task's ID 
 * @param {String} task_id The ID of the task need checking
 */
const checkHandler = task_id => {
    store.dispatch(checkTask(task_id))
}

/**
 * Task deletion handler
 * @name deleteHandler
 * @desc Dispatch the task-deleting action with the requested task's ID 
 * @param {String} task_id The ID of the task need checking
 */
const deleteHandler = task_id => {
    store.dispatch(deleteTask(task_id))
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}


export default connect(mapStateToProps)(TodoBin)
