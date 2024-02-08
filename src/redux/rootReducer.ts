import { combineReducers } from 'redux';
import articlesReducer from './articlesSlice';
import asyncArticlesReducer from './asyncSlice';

const rootReducer = combineReducers({
  articles: articlesReducer,
  asyncArticles: asyncArticlesReducer
});

export default rootReducer;