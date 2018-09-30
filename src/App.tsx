import * as React from "react";

import { Background, Container, HorizontalScrollList } from "./common";
import Forecast from "./components/Forecast";
import { kelvinToCelcius } from "./utils/temperature";
import { connect } from "react-redux";
import { getForecastRequest } from "./redux/ForecastReducer";

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

class App extends React.Component<Props, State> {
  state = {
    loading: true,
    weather: null,
    location: "helsinki"
  };

  componentDidMount() {
    this.props.getForecastRequest(this.state.location);
  }

  updateWeather = async () => {
    this.props.getForecastRequest(this.state.location);
  };

  public render() {
    const { location } = this.state;
    const { weather, loading } = this.props.forecast;

    return (
      <Background>
        <Container textAlignCenter>
          <input
            value={location}
            onChange={e => this.setState({ location: e.target.value })}
            onBlur={() => this.updateWeather()}
          />

          <p>{loading ? "Loading..." : ""}</p>

          <p>
            {weather !== null && weather.cod !== "200" && !loading
              ? weather.message
              : ""}
          </p>

          {weather !== null &&
            weather.cod === "200" &&
            !loading && (
              <div>
                <p>
                  <strong>{weather.city.name}</strong>
                  <br />
                  {kelvinToCelcius(weather.list[0].main.temp).toFixed(0)} °C
                </p>
                <HorizontalScrollList>
                  {weather.list.map(stats => (
                    <Forecast
                      key={stats.dt}
                      date={stats.dt * 1000}
                      temperature={stats.main.temp}
                      temperatureMin={stats.main.temp_min}
                      temperatureMax={stats.main.temp_max}
                    />
                  ))}
                </HorizontalScrollList>
              </div>
            )}
        </Container>
      </Background>
    );
  }
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
