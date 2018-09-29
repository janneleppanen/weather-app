import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { theme } from "./config/global-styles";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
