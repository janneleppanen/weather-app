import { createActions, handleActions } from "redux-actions";

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
    [ADD_BOOKMARK]: (state: State, { payload }) => {
      return [...state, payload];
    },
    [REMOVE_BOOKMARK]: (state: State, { payload }) => {
      return state.filter(i => i !== payload);
    }
  },
  STATE
);

export default reducer;
