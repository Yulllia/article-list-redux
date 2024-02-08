import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateAsyncArtivles } from "../interfaces/interface";

const initialState: InitialStateAsyncArtivles = {
  list: [],
  isLoading: false,
  error: '',
};

const pageSize = 10;

export const getArticleAsync = createAsyncThunk(
  "asyncArticles/getTodosAsync",
  async () => {
    try {
      const resp = await fetch(
        `https://newsapi.org/v2/everything?q=null&apiKey=${process.env.REACT_APP_API_URL}&pageSize=${pageSize}`
      );
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      const articles = await resp.json();
      return { articles };
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.error("Error fetching articles:", error.message);
      } else {
        console.error("Error fetching articles:", "An unknown error occurred");
      }
    }
  }
);

const asyncSlice = createSlice({
  name: "asyncArticles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticleAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArticleAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload?.articles;
    });
    builder.addCase(getArticleAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default asyncSlice.reducer;
