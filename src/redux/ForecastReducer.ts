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

export const getForecast = (location: string = "") => ({
  type: GET_FORECAST.REQUEST,
  payload: location
});

const reducer = (state = STATE, action) => {
  switch (action.type) {
    case GET_FORECAST.REQUEST:
      return { ...state, loading: true };
    case GET_FORECAST.ERROR:
      return { ...state, loading: false };
    case GET_FORECAST.SUCCESS:
      return { ...state, loading: false, weather: action.payload };
    default:
      return state;
  }
};

export default reducer;
