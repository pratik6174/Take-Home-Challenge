import { configureStore } from '@reduxjs/toolkit'
import booksReducer from "./feature/home/getBooksSlice"

export const store = configureStore({
  reducer: {
    books : booksReducer,
  },
})