import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import registerServiceWorker from "./registerServiceWorker";
import { store, persistor } from "./config/store";
import Routes from "./config/Routes";
import Translations from "./config/Translations";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Translations>
        <Routes />
      </Translations>
    </PersistGate>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
