import * as React from "react";
import { RouteProps } from "react-router";
import _ from "lodash";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { Container, HorizontalScrollList } from "./common";
import Forecast from "./components/Forecast";
import { kelvinToCelcius } from "./utils/temperature";
import { connect } from "react-redux";
import { getForecastRequest } from "./redux/ForecastReducer";
import {
  groupForecastsByDays,
  getForecastAverage,
  getForecastMax,
  getForecastMin
} from "./utils/forecast";

interface Props {
  forecast: {
    test: string;
    loading: boolean;
    weather: any;
  };
  getForecastRequest: any;
}

interface State {
  weather: Weather | null;
  loading: boolean;
  location: string;
}

class App extends React.Component<Props & RouteProps, State> {
  state = {
    loading: true,
    weather: null,
    location: ""
  };

  componentDidMount() {
    let { location } = this.state;
    if (this.props.match.params.hasOwnProperty("location")) {
      location = this.props.match.params.location;
      this.setState({ location });
    }
    this.props.getForecastRequest(location);
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props.match.params;
    if (location !== prevProps.match.params.location) {
      this.props.getForecastRequest(location);
    }
  }

  updateWeather = async () => {
    this.props.history.push(`/locations/${this.state.location}`);
  };

  public render() {
    const { weather, loading } = this.props.forecast;
    const { location } = this.state;

    return (
      <div>
        <Container textAlignCenter>
          <input
            value={location}
            onChange={e => this.setState({ location: e.target.value })}
            onBlur={() => this.updateWeather()}
            onKeyDown={e => e.key === "Enter" && this.updateWeather()}
          />

          <p>{loading ? "Loading..." : ""}</p>

          <p>
            {weather !== null && weather.cod !== "200" && !loading
              ? weather.message
              : ""}
          </p>

          {weather !== null &&
            weather.cod === "200" &&
            !loading &&
            this.renderWeather()}
        </Container>
      </div>
    );
  }

  renderWeather = () => {
    const { weather } = this.props.forecast;
    const { location } = this.state;
    const grouped = groupForecastsByDays(weather.list);

    return (
      <div>
        <p>
          {format(weather.list[0].dt, "dddd")}
          <br />
          {format(weather.list[0].dt, "Do MMMM")}
          <br />
          {weather.city.name}
          <br />
        </p>
        <h2>{kelvinToCelcius(weather.list[0].main.temp).toFixed(0)} °C</h2>
        <HorizontalScrollList>
          {Object.keys(grouped).map(key => (
            <React.Fragment key={key}>
              <Link to={`/locations/${location}/${key}`}>
                <Forecast
                  date={format(key, "ddd")}
                  temperature={getForecastAverage(grouped[key])}
                  temperatureMin={getForecastMin(grouped[key])}
                  temperatureMax={getForecastMax(grouped[key])}
                />
              </Link>
            </React.Fragment>
          ))}
        </HorizontalScrollList>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    forecast: state.forecast
  };
};

export default connect(
  mapStateToProps,
  { getForecastRequest }
)(App);
