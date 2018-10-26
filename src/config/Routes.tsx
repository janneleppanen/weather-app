import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";

import { lightTheme, darkTheme, GlobalStyles } from "./global-styles";
import App from "../containers/App";
import { Background } from "../common";
import BookmarksPage from "../containers/BookmarksPage";
import SettingsPage from "../containers/SettingsPage";

const DateDetails = () => <div>Date Details Page</div>;

const Routes = props => {
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Background>
          <GlobalStyles />
          <Route exact path="/locations" component={App} />
          <Route exact path="/locations/:location" component={App} />
          <Route path="/locations/:location/:date" component={DateDetails} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/bookmarks" component={BookmarksPage} />
          <Route exact path="/" render={() => <Redirect to="/locations" />} />
        </Background>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  theme: state.settings.theme
});

export default connect(mapStateToProps)(Routes);
