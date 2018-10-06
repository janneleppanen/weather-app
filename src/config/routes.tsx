import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "../App";
import Header from "../components/Header";
import { Background } from "../common";

const SettingsPage = () => <div>Settings Page</div>;
const LocationsPage = () => <div>Locations Page</div>;
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
