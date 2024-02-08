import { createSlice } from "@reduxjs/toolkit";
import {
  ArticleItem,
  InitialState,
  ArticleAction,
} from "../interfaces/interface";

const initialState: InitialState = {
  list: [],
  pinnedItem: null,
  searchTerm: ""
};

export const reducerAddForm = (state: ArticleItem, action: ArticleAction) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return {
        id: 0,
        image: "",
        author: "",
        description: "",
        title: "",
      };
    default:
      return state;
  }
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.list.push({
        id: Date.now(),
        title: action.payload.title,
        author: action.payload.author,
        description: action.payload.description,
        image: action.payload.image,
      })
    },
    deleteArticle: (state, action) => {
      state.list = state.list.filter(
        (article: ArticleItem) => article.id !== action.payload
      );
      if (state.pinnedItem && state.pinnedItem === action.payload) {
        state.pinnedItem = null;
      }
    },
    pinItem: (state, action) => {
      state.pinnedItem = action.payload;
      if (state.pinnedItem) {
        state.list = [...state.list.filter(article => article.id === state.pinnedItem), ...state.list.filter(article => article.id !== state.pinnedItem)];
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addArticle, deleteArticle, pinItem, setSearchTerm } = articleSlice.actions;

export default articleSlice.reducer;
