import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './slices/todos-slice'


const store = configureStore({
  reducer: {
    todos: todosReducer
  }
})

export default store