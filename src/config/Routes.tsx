import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";

import { lightTheme, darkTheme, GlobalStyles } from "./global-styles";
import App from "../containers/App";
import Header from "../components/Header";
import { Background } from "../common";
import LocationsPage from "../containers/LocationsPage";
import SettingsPage from "../containers/SettingsPage";

const DateDetails = () => <div>Date Details Page</div>;

const Routes = props => {
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Background>
          <GlobalStyles />
          <Header />

          <Route exact path="/" component={App} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/locations" component={LocationsPage} />
          <Route exact path="/locations/:location" component={App} />
          <Route path="/locations/:location/:date" component={DateDetails} />
        </Background>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  theme: state.settings.theme
});

export default connect(mapStateToProps)(Routes);
