import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import 'axios'
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
const createHash = require("crypto").createHash;
const salt = require("crypto").randomBytes;

const generateNewTodos = () => {
  const sha256 = createHash('sha256');
  return {
    todosId: sha256.update(uuid4()).update(salt(4)).digest('hex').slice(0,8),
    created: Date(),
    tasks: []
  }
}

const initialState = {tasks: []};

const saveTodos = createAsyncThunk(
  "todos/saveTodos",
  async (params, thunkAPI) => {
    console.log(thunkAPI.getState());
    await axios
      .post("/todos", thunkAPI.getState().todos)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    return;
  }
);

const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  async (params, thunkAPI) => {

    let response;
    await axios
      .get("/todos")
      .then(res => response = res.body)
      .catch(err => console.error(err));
    return response;
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask(state, action) {
      const new_task = action.payload;
      state.tasks.push(new_task);
    },
    checkTask(state, action) {
      const task = state.tasks.find(task => task.id === action.payload);
      task.checked = !task.checked;
    },
    deleteTask(state, action) {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    },
    clearTasks(state, action) {
      return initialState;
    },
  },
  extraReducer: {
    [saveTodos.fulfilled]: (state, action) => {
      console.log("saved todos.");
    },
    [loadTodos.fulfilled]: (state, action) => {
      state.push(action.payload);
      console.log("loaded todos.");
    }

  }
})



export const { addTask, checkTask, deleteTask, clearTasks, saveTasks } = todosSlice.actions;
export {saveTodos};
export default todosSlice.reducer;