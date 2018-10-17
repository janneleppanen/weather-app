import { createActions } from "redux-actions";
import { handleActions } from "../utils/redux-helpers";

export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

type State = Bookmarks;

const STATE = [];

export const { addBookmark, removeBookmark } = createActions({
  [ADD_BOOKMARK]: (payload: string = "") => payload,
  [REMOVE_BOOKMARK]: (payload: string = "") => payload
});

const reducer = handleActions(
  {
    [ADD_BOOKMARK]: (state: State, payload) => {
      state.push(payload);
    },
    [REMOVE_BOOKMARK]: (state: State, payload) => {
      state.splice(state.findIndex(bookmark => bookmark === payload), 1);
    }
  },
  STATE
);

export default reducer;
