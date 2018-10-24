import * as React from "react";
import { RouteProps } from "react-router";
import _ from "lodash";
import { compose } from "lodash/fp";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";

import MainForecastWrapper from "../components/MainForecastWrapper";
import Bookmark from "../components/Bookmark";
import { Container, Input, Notice } from "../common";
import Forecast from "../components/Forecast";
import CurrentWeather from "../components/CurrentWeather";
import ForecastDays from "../components/ForecastDays";
import { connect } from "react-redux";
import { getForecastRequest } from "../redux/ForecastReducer";
import { addBookmark, removeBookmark } from "../redux/BookmarkReducer";
import { getForecastMax } from "../utils/forecast";
import { getForecastByCoords } from "../services/OpenWeatherMap";

interface Props {
  forecast: {
    test: string;
    loading: boolean;
    weather: any;
  };
  getForecastRequest: any;
  temperature: TemperatureSetting;
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
    if (location) this.props.getForecastRequest(location);
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props.match.params;
    if (location !== prevProps.match.params.location) {
      this.props.getForecastRequest(location);
    }
  }

  updateForecast = async () => {
    if (!this.state.location) return;
    this.props.history.push(`/locations/${this.state.location}`);
  };

  updateForecastByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(e => {
        const { latitude, longitude } = e.coords;
        getForecastByCoords(latitude, longitude).then(res => {
          const newLocation = res.list[0].name;
          this.setState({ location: newLocation });
          this.updateForecast();
        });
      });
    }
  };

  public render() {
    const { addBookmark, removeBookmark, bookmarks, t } = this.props;
    const { weather, loading } = this.props.forecast;
    const { location } = this.state;

    return (
      <Container>
        <Input
          value={location}
          onChange={e => this.setState({ location: e.target.value })}
          onBlur={() => this.updateForecast()}
          onKeyDown={e => e.key === "Enter" && this.updateForecast()}
          placeholder={t("common.enterLocation")}
        />

        {loading && <Notice centerText>Loading...</Notice>}

        <Bookmark
          location={location}
          label={t("common.remember")}
          checked={bookmarks.includes(location)}
          onSelect={() => addBookmark(location)}
          onUnselect={() => removeBookmark(location)}
        />

        <Container textAlignCenter>
          <button onClick={this.updateForecastByLocation}>
            {t("common.geolocationButton")}
          </button>
        </Container>

        {weather !== undefined &&
          weather.cod !== "200" &&
          !loading && (
            <Notice centerText type="error">
              {weather.message}
            </Notice>
          )}

        {weather !== undefined &&
          weather.cod === "200" &&
          !loading &&
          this.renderWeather()}
      </Container>
    );
  }

  renderWeather = () => {
    const { weather } = this.props.forecast;
    const temperature = this.props.temperature;
    const { location } = this.state;

    return (
      <MainForecastWrapper>
        <CurrentWeather
          location={weather.city.name}
          forecast={weather.list[0]}
          temperatureScale={temperature}
        />

        <ForecastDays
          forecasts={weather.list}
          renderItem={(item, key) => (
            <Link to={`/locations/${location}/${key}`}>
              <Forecast
                date={format(key, "ddd")}
                temperature={getForecastMax(item)}
                temperatureScale={temperature}
              />
            </Link>
          )}
        />
      </MainForecastWrapper>
    );
  };
}

const mapStateToProps = ({ forecast, bookmarks, settings }) => ({
  forecast,
  bookmarks,
  temperature: settings.temperature
});

export default compose(
  withNamespaces(),
  connect(
    mapStateToProps,
    { getForecastRequest, addBookmark, removeBookmark }
  )
)(App);
