import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import 'axios'
import axios from 'axios';

const initialState = []

const saveTodos = createAsyncThunk(
  "todos/saveTodos",
  async (todos, thunkAPI) => {
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
    return response.todos;
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask(state, action) {
      const new_task = action.payload;
      state.push(new_task);
    },
    checkTask(state, action) {
      const task = state.find(task => task.id === action.payload);
      task.checked = !task.checked;
    },
    deleteTask(state, action) {
      return state.filter(task => task.id !== action.payload)
    },
    clearTasks(state, action) {
      return [];
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