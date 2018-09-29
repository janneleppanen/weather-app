import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../redux";
import createSagaMiddleware from "redux-saga";

import sagas from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {},
  enhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export default store;
