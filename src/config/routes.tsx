import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "../containers/App";
import Header from "../components/Header";
import { Background } from "../common";
import LocationsPage from "../containers/LocationsPage";
import SettingsPage from "../containers/SettingsPage";

const DateDetails = () => <div>Date Details Page</div>;

const Routes = () => (
  <Router>
    <Background>
      <Header />

      <Route exact path="/" component={App} />
      <Route exact path="/settings" component={SettingsPage} />
      <Route exact path="/locations" component={LocationsPage} />
      <Route exact path="/locations/:location" component={App} />
      <Route path="/locations/:location/:date" component={DateDetails} />
    </Background>
  </Router>
);

export default Routes;
