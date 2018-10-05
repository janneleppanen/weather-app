import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { theme } from "./config/global-styles";
import store from "./config/store";
import Routes from "./config/routes";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
