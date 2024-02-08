import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArticleItem, ArticlesAdditional, AsyncArticles, InitialStateAsyncArtivles } from "../interfaces/interface";

const initialState: InitialStateAsyncArtivles = {
  list: [],
  isLoading: false,
  error: '',
  searchValue: '',
  totalPage: 10
};

const pageSize = 10;

export const getArticleAsync = createAsyncThunk(
  "asyncArticles/getArticlesAsync",
  async (search?: string) => {
    try {
      const resp = await fetch(
        `https://newsapi.org/v2/everything?q=${search?.length ? search : null}&apiKey=${process.env.REACT_APP_API_URL}&pageSize=${pageSize}`
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

export const getArticleAdditional = createAsyncThunk(
  "asyncArticles/getAdditionalAsync",
  async (articlesAdditional: ArticlesAdditional, { getState }) => {
    const { search, titles } = articlesAdditional
    const { totalPage } = (getState() as AsyncArticles).asyncArticles;

    try {
      const resp = await fetch(
        `https://newsapi.org/v2/everything?q=${search?.length ? search : null}&apiKey=${process.env.REACT_APP_API_URL}&pageSize=${totalPage}`
      );
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      const articles = await resp.json();
      const newArticles = articles?.articles.filter((article: ArticleItem) => !titles?.includes(article.title));
      return { newArticles, articles };
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.error("Error fetching additional articles:", error.message);
      } else {
        console.error("Error fetching additional articles:", "An unknown error occurred");
      }
    }
  }
);


const asyncSlice = createSlice({
  name: "asyncArticles",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setTotalQuantity: (state, action) => {
      state.totalPage += action.payload;
    },
  },
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
    builder.addCase(getArticleAdditional.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getArticleAdditional.fulfilled, (state, action) => {
      state.isLoading = false;
      const newArticle = action.payload?.newArticles
      if(newArticle){
        state.list = [state.list, ...newArticle];
      }
      state.list = action.payload?.articles;
    })
    builder.addCase(getArticleAdditional.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { setSearchValue, setTotalQuantity } = asyncSlice.actions;

export default asyncSlice.reducer;
