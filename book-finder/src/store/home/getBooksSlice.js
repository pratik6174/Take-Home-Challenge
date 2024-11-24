import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooksByTitle } from '../../../service/home/getBookDetails';

// Thunk to fetch books based on the title
export const getBooks = createAsyncThunk('books/getBooks', async (title) => {
  const data = await fetchBooksByTitle(title);
  return data.docs;
});


// Slice to manage books-related state
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
