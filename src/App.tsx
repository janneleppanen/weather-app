import * as React from "react";
import { RouteProps } from "react-router";
import _ from "lodash";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import MainForecastWrapper from "./components/MainForecastWrapper";
import { Container, Input, Notice } from "./common";
import Forecast from "./components/Forecast";
import CurrentWeather from "./components/CurrentWeather";
import ForecastDays from "./components/ForecastDays";
import { connect } from "react-redux";
import { getForecastRequest } from "./redux/ForecastReducer";
import { getForecastMax } from "./utils/forecast";

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
    if (!this.state.location) return;
    this.props.history.push(`/locations/${this.state.location}`);
  };

  public render() {
    const { weather, loading } = this.props.forecast;
    const { location } = this.state;

    return (
      <div>
        <Container>
          <Input
            value={location}
            onChange={e => this.setState({ location: e.target.value })}
            onBlur={() => this.updateWeather()}
            onKeyDown={e => e.key === "Enter" && this.updateWeather()}
            placeholder="Enter your location"
          />

          {loading && <Notice centerText>Loading...</Notice>}

          {weather !== null &&
            weather.cod !== "200" &&
            !loading && (
              <Notice centerText type="error">
                {weather.message}
              </Notice>
            )}

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

    return (
      <MainForecastWrapper>
        <CurrentWeather
          location={weather.city.name}
          forecast={weather.list[0]}
        />

        <ForecastDays
          forecasts={weather.list}
          renderItem={(item, key) => (
            <Link to={`/locations/${location}/${key}`}>
              <Forecast
                date={format(key, "ddd")}
                temperature={getForecastMax(item)}
              />
            </Link>
          )}
        />
      </MainForecastWrapper>
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
