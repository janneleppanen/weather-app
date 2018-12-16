import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";

import { lightTheme, darkTheme, GlobalStyles } from "./global-styles";
import { Background, Loader } from "../common";
import Header from "../components/Header";

const Main = WaitingComponent(React.lazy(() => import("../containers/Main")));
const BookmarksPage = WaitingComponent(
  React.lazy(() => import("../containers/BookmarksPage"))
);
const SettingsPage = WaitingComponent(
  React.lazy(() => import("../containers/SettingsPage"))
);
const DetailsPage = WaitingComponent(
  React.lazy(() => import("../containers/DetailsPage"))
);

interface Props {
  theme: string;
}

const Routes = (props: Props) => {
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Background>
          <GlobalStyles />
          <Header />
          <Switch>
            <Route exact path="/locations" component={Main} />
            <Route exact path="/locations/:location" component={Main} />
            <Route path="/locations/:location/:date" component={DetailsPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/bookmarks" component={BookmarksPage} />
            <Route exact path="/" render={() => <Redirect to="/locations" />} />
          </Switch>
        </Background>
      </Router>
    </ThemeProvider>
  );
};

function WaitingComponent(
  Component: React.LazyExoticComponent<React.ComponentType>
) {
  return (props: JSX.IntrinsicAttributes) => (
    <React.Suspense fallback={<Loader />}>
      <Component {...props} />
    </React.Suspense>
  );
}

const mapStateToProps = (state: GlobalState) => ({
  theme: state.settings.theme
});

export default connect(mapStateToProps)(Routes);
