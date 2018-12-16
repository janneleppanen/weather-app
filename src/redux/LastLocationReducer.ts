import { createActions } from "redux-actions";
import { handleActions } from "../utils/redux-helpers";

export const SET_LAST_LOCATION = "SET_LAST_LOCATION";

type State = LastLocationState;

export const { setLastLocation } = createActions({
  [SET_LAST_LOCATION]: (payload: string = "") => payload
});

const reducer = handleActions(
  {
    [SET_LAST_LOCATION]: (state: State, payload: string) => {
      return payload;
    }
  },
  null
);

export default reducer;
