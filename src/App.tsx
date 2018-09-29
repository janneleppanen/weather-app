import * as React from "react";
import { getWeather } from "./services/openWeatherMap";
import { Background, Container } from "./common";
import { kelvinToCelcius } from "./utils/temperature";

interface State {
  weather: Weather | null;
  loading: boolean;
  location: string;
}

class App extends React.Component<{}, State> {
  state = {
    loading: true,
    weather: null,
    location: ""
  };

  componentDidMount() {
    this.updateWeather();
  }

  updateWeather = async () => {
    const weather = await getWeather(this.state.location);
    if (weather.cod !== "200") {
      this.setState({ weather: null, loading: false });
      return;
    }
    this.setState({ weather, loading: false });
  };

  public render() {
    const { weather, location } = this.state;

    return (
      <Background>
        <Container textAlignCenter>
          <input
            value={location}
            onChange={e => this.setState({ location: e.target.value })}
            onBlur={() => this.updateWeather()}
          />
          {weather !== null && (
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

export default App;
