import { all, fork } from "redux-saga/effects";

import ForecastSagas from "./ForecastSagas";

export default function* rootSaga() {
  yield all([fork(ForecastSagas)]);
}
