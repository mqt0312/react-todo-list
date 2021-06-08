import React from 'react'
import { connect } from 'react-redux'
import { stringify, v4 as uuid } from 'uuid'
import { ContextMenu, ContextMenuTrigger, MenuItem  } from 'react-contextmenu'

import './TodoBin.css'

import store from '../redux/store'
import { addTask, checkTask, deleteTask, saveTodos } from '../redux/slices/todos-slice'


const TodoBin = (props) => {
    // React.useEffect(() => {
    //     console.log("adding resize listener...")
    //     const resizeHandler = () => textAreaAutoExpand(document.getElementById("todobin-new-task-textarea"));
    //     window.addEventListener('resize', resizeHandler);
    //     return () => {
    //         console.log("removing resize listener...")
    //         window.removeEventListener('resize', resizeHandler);
    //     }
    // }, [])

    return (
        <div className="container-fluid my-3">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form onSubmit={taskSubmitHandler}>
                        <input type="text" className="form-control" placeholder="New Task" />

                    </form>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-6 mt-2">
                    <ul className="list-group">
                        {props.todos.map(task => (
                            <ContextMenuTrigger id="todo-contextmenu" key={task.id}>
                                <li data-taskid={task.id.toString()} className="list-group-item list-group-item-action d-flex justify-content-left">
                                    {/* {task.checked ? 
                                        <input class="form-check-input me-1" type="checkbox" checked onChange={() => checkHandler(task.id)}/> 
                                        : <input class="form-check-input me-1" type="checkbox" onChange={() => checkHandler(task.id)}/> 
                                    } */}
                                    <input className="form-check-input me-1" type="checkbox" checked={task.checked} onChange={() => checkHandler(task.id)} />
                                    {task.title}
                                    
                                        
                                    
                                    
                                </li>
                            </ContextMenuTrigger>
                            
                        ))}
                        <ContextMenu id="todo-contextmenu">
                            <MenuItem data={{type: "delete"}} onClick={(e, data, elem) => deleteHandler(elem.children[0].dataset.taskid)}>
                                Delete
                            </MenuItem>
                            
                        </ContextMenu>


                    </ul>
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

function textAreaAutoExpand(ta_elem) {
    /* An event handler for a text area that adjusts the height of 
       the text area to fit the content. The minimum height is the
       height of the textarea when it is loaded.
     */
    if (textAreaAutoExpand.initial_height === undefined) {
        textAreaAutoExpand.initial_height = ta_elem.scrollHeight;
    }
    ta_elem.style.height = "1px";
    ta_elem.style.height = Math.max(ta_elem.scrollHeight, textAreaAutoExpand.initial_height) + "px";
}

function taskSubmitHandler(e) {
    e.preventDefault()
    const input_elem = e.target[0];
    if (!(input_elem.value === "")) {
        const input_text = input_elem.value;
        input_elem.value = "";
        const new_task = {
            title: input_text,
            checked: false,
            id: uuid()
        }
        store.dispatch(addTask(new_task));
    }

}

const checkHandler = task_id => {
    store.dispatch(checkTask(task_id))
}

const deleteHandler = task_id => {
    store.dispatch(deleteTask(task_id))
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}


export default connect(mapStateToProps)(TodoBin)
