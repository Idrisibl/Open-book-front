import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: [],
  book: []
};

export const fetchAuthorBook = createAsyncThunk(
  "authorBook/fetchAuthorBook",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/authors");
      const data = await res.json();
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (authorId, thunkAPI) => {
      try {
        const res = await fetch("http://localhost:3001/books");
        const data = await res.json();
        //console.log(authorId);
        return {
          data: data,
          authorId: authorId
        }
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const authorBookSlice = createSlice({
  name: "authorBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAuthorBook.fulfilled, (state, action) => {
      state.author = action.payload;
    })
    .addCase(fetchBooks.fulfilled, (state, action) => {
      console.log(action.payload.authorId);
        state.book = action.payload.data
        state.book = state.book.filter((item)=> item.author._id === action.payload.authorId)
      });
  },
});

export default authorBookSlice.reducer;