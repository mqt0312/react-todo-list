import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const initialState = {tasks: [], status: "idle"};

/**
 * @name saveTodos
 * @function
 * @desc Save a todo list by sending a POST request to the server
 */
const saveTodos = createAsyncThunk(
  "todos/saveTodos",
  async (_, thunkAPI) => {
    console.log(thunkAPI.getState());
    let response;
    await axios
      .post("/todos", thunkAPI.getState().todos)
      .then(res => response = res.data)
      .catch(err => console.error(err));
    return response;
  }
);

/**
 * @name loadTodos
 * @function
 * @desc Load a todo list by sending a GET request with an ID string to the server
 * @param {String} todosId The ID of the request todo list
 */
const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  async (todosId, _) => {
    let response;
    await axios
      .get(`/todos/${todosId}`)
      .then(res => response = res.data)
      .catch(err => console.error(err));
    console.log(response);
    return response;
  }
)

/** @namespace */
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * @name addTask
     * @function
     * @memberof todosSlice
     * @desc Action generator for adding a task with a given title string
     * @param {String} new_task The new task's title
     */
    addTask(state, action) {
      const new_task = action.payload;
      new_task.taskId = uuid();
      state.tasks.push(new_task);
    },
    /**
     * @name addTask
     * @function
     * @memberof todosSlice
     * @desc Action generator for checking a task with a given task id
     * @param {String} task_id The ID of the task that's being checked
     */
    checkTask(state, action) {
      const task = state.tasks.find(task => task.taskId === action.payload);
      task.checked = !task.checked;
    },
    /**
     * @name deleteTask
     * @function
     * @memberof todosSlice
     * @desc Action generator for deleting a task with a given task id
     * @param {String} task_id The ID of the task that's being deleted
     */
    deleteTask(state, action) {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.taskId !== action.payload)
      }
    },
    /**
     * @name deleteTask
     * @function
     * @memberof todosSlice
     * @desc Action generator for clearing all task from the store
     */
    clearTasks(state, action) {
      return initialState;
    },
  },
  extraReducers: {
    [saveTodos.fulfilled]: (state, action) => {
      action.payload.status = "saved";
      return action.payload;  
    },
    [saveTodos.pending]: (state, action) => {
      state.status = "busy";
    },
    [loadTodos.fulfilled]: (state, action) => {
      if (!action.payload) {
        return {
          status: "error",
          errmsg: "Cannot find todo list"
        }
      }
      else {
        action.payload.status = "loaded"
        return action.payload
      }
      
    },
    [loadTodos.pending]: (state, action) => {
      state.status = "busy";
    }

  }
})

export const { addTask, checkTask, deleteTask, clearTasks } = todosSlice.actions;
export {saveTodos, loadTodos};
export default todosSlice.reducer;