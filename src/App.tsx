import * as React from "react";
import { Background, Container } from "./common";
import { kelvinToCelcius } from "./utils/temperature";
import { connect } from "react-redux";
import { getForecast } from "./redux/ForecastReducer";

interface Props {
  forecast: {
    test: string;
    loading: boolean;
    weather: any;
  };
  getForecast: any;
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
    location: ""
  };

  componentDidMount() {
    this.props.getForecast();
  }

  updateWeather = async () => {
    this.props.getForecast(this.state.location);
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
            {weather !== null && weather.cod !== "200" ? weather.message : ""}
          </p>

          {weather !== null &&
            weather.cod === "200" &&
            !loading && (
              <p>
                <strong>{weather.city.name}</strong>
                <br />
                {kelvinToCelcius(weather.list[0].main.temp).toFixed(0)} °C
              </p>
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
  { getForecast }
)(App);
