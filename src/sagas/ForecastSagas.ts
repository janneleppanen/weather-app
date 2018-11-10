import { takeLatest, call, put } from "redux-saga/effects";

import { GET_FORECAST } from "../redux/ForecastReducer";
import OpenWeatherMapAPI from "../services/OpenWeatherMap";

function* fetchForecast(action: Action) {
  try {
    const forecast: Weather = yield call(
      // @ts-ignore
      OpenWeatherMapAPI.getForecast,
      action.payload
    );
    yield put({ type: GET_FORECAST.SUCCESS, payload: forecast });
  } catch (e) {
    yield put({ type: GET_FORECAST.ERROR, payload: "No go" });
  }
}

function* saga() {
  yield takeLatest(GET_FORECAST.REQUEST, fetchForecast);
}

export default saga;
