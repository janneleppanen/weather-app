import { createActions, handleActions } from "redux-actions";

export const GET_FORECAST = {
  REQUEST: "GET_FORECAST_REQUEST",
  ERROR: "GET_FORECAST_ERROR",
  SUCCESS: "GET_FORECAST_SUCCESS"
};

const STATE = {
  test: "hello",
  loading: false,
  weather: null
};

export const { getForecastRequest } = createActions({
  [GET_FORECAST.REQUEST]: (payload: string = "") => payload,
  [GET_FORECAST.ERROR]: (payload: string = "") => payload,
  [GET_FORECAST.REQUEST]: (payload: any) => payload
});

// export const getForecast = (location: string = "") => ({
//   type: GET_FORECAST.REQUEST,
//   payload: location
// });

// const reducer = (state = STATE, action) => {
//   switch (action.type) {
//     case GET_FORECAST.REQUEST:
//       return { ...state, loading: true };
//     case GET_FORECAST.ERROR:
//       return { ...state, loading: false };
//     case GET_FORECAST.SUCCESS:
//       return { ...state, loading: false, weather: action.payload };
//     default:
//       return state;
//   }
// };

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
