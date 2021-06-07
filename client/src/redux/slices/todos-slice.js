import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask(state, action) {
      const new_task = action.payload;
      state.push(new_task);
    },
    checkTask(state, action) {
      const todo = state.find(task => task.id === action.payload);
      todo.checked = !todo.checked;
    },
    deleteTask(state, action) {
      return state.filter(task => task.id !== action.payload)
    },
    clearTasks(state, action) {
      console.log("clearing tasks");
      return [];
    },
  }
})

export const { addTask, checkTask, deleteTask, clearTasks } = todosSlice.actions

export default todosSlice.reducer