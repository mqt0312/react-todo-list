import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import store from '../store';

const initialState = {tasks: [], status: "idle"};

/**
 * @name saveTodos
 * @function
 * @desc Save a todo list by sending a POST request to the server
 */
const saveTodos = createAsyncThunk(
  "todos/saveTodos",
  async (_, thunkAPI) => {
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
    if (response)
      return response;
    else {
      store.dispatch(raiseError("Cannot find todos list"));
      return null;
    }
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
      // Right now, errors happen when list cannot be found or is already saved. can be cleared by making changes to the current list
      state.status = "idle";
      state.errmsg = "";
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
      // Right now, errors happen when list cannot be found or is already saved. can be cleared by making changes to the current list
      state.status = "idle";
      state.errmsg = "";
    },

    /**
     * @name deleteTask
     * @function
     * @memberof todosSlice
     * @desc Action generator for deleting a task with a given task id
     * @param {String} task_id The ID of the task that's being deleted
     */
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(task => task.taskId !== action.payload)
      // Right now, errors happen when list cannot be found or is already saved. can be cleared by making changes to the current list
      state.status = "idle";
      state.errmsg = "";
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

    raiseError(state, action) {
      state.status = "error";
      state.errmsg = action.payload;
    },

    clearError(state, action) {
      state.status = "idle";
      state.errmsg = "";
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
      if (action.payload) {
        action.payload.status = "loaded"
        return action.payload
      }
    },
    
    [loadTodos.pending]: (state, action) => {
      state.status = "busy";
    }

  }
})

export const { addTask, checkTask, deleteTask, clearTasks, raiseError } = todosSlice.actions;
export {saveTodos, loadTodos};
export default todosSlice.reducer;