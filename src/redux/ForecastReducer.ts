import { createActions } from "redux-actions";
import { handleActions } from "../utils/redux-helpers";

export const GET_FORECAST = {
  REQUEST: "GET_FORECAST_REQUEST",
  ERROR: "GET_FORECAST_ERROR",
  SUCCESS: "GET_FORECAST_SUCCESS"
};

export const STATE = {
  loading: false,
  weather: {}
};

export const {
  getForecastRequest,
  getForecastError,
  getForecastSuccess
} = createActions({
  [GET_FORECAST.REQUEST]: (payload: string = "") => payload,
  [GET_FORECAST.ERROR]: (payload: string = "") => payload,
  [GET_FORECAST.SUCCESS]: (payload: string = "") => payload
});

const reducer = handleActions(
  {
    [GET_FORECAST.REQUEST]: (state: ForecastState, payload: string) => {
      state.loading = true;
    },
    [GET_FORECAST.ERROR]: (state: ForecastState, payload: string) => {
      state.loading = false;
    },
    [GET_FORECAST.SUCCESS]: (
      state: ForecastState,
      payload: { weather: Weather; name: string }
    ) => {
      state.loading = false;
      state.weather[payload.name] = payload.weather;
    }
  },
  STATE
);

export default reducer;
