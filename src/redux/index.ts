import { combineReducers } from "redux";

import ForecastReducer from "./ForecastReducer";
import BookmarkReducer from "./BookmarkReducer";

export default combineReducers({
  forecast: ForecastReducer,
  bookmarks: BookmarkReducer
});
