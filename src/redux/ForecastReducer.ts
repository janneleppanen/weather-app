import { createActions, handleActions } from "redux-actions";

export const GET_FORECAST = {
  REQUEST: "GET_FORECAST_REQUEST",
  ERROR: "GET_FORECAST_ERROR",
  SUCCESS: "GET_FORECAST_SUCCESS"
};

const STATE = {
  loading: false,
  weather: undefined
};

export const { getForecastRequest } = createActions({
  [GET_FORECAST.REQUEST]: (payload: string = "") => payload,
  [GET_FORECAST.ERROR]: (payload: string = "") => payload,
  [GET_FORECAST.REQUEST]: (payload: any) => payload
});

const reducer = handleActions(
  {
    [GET_FORECAST.REQUEST]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [GET_FORECAST.ERROR]: (state, { payload }) => {
      return { ...state, loading: false };
    },
    [GET_FORECAST.SUCCESS]: (state, { payload }) => {
      return { ...state, loading: false, weather: payload };
    }
  },
  STATE
);

export default reducer;
