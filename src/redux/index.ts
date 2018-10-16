import { combineReducers } from "redux";

import ForecastReducer from "./ForecastReducer";
import BookmarkReducer from "./BookmarkReducer";
import SettingsReducer from "./SettingsReducer";

export default combineReducers({
  forecast: ForecastReducer,
  bookmarks: BookmarkReducer,
  settings: SettingsReducer
});
