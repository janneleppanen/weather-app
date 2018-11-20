import * as React from "react";
import { RouteProps } from "react-router";
import _ from "lodash";
import { connect } from "react-redux";
import { compose } from "redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import MainForecastWrapper from "../components/MainForecastWrapper";
import Bookmark from "../components/Bookmark";
import { Container, Notice, AppContent, Loader } from "../common";
import Forecast from "../components/Forecast";
import CurrentWeather from "../components/CurrentWeather";
import ForecastDays from "../components/ForecastDays";
import SearchField from "../components/SearchField";
import { getForecastRequest } from "../redux/ForecastReducer";
import { addBookmark, removeBookmark } from "../redux/BookmarkReducer";
import { getForecastMax } from "../utils/forecast";
import { getForecastByCoords } from "../services/OpenWeatherMap";
import { AppName } from "../config/constants";
import { ReactComponent as BalloonsDrawing } from "../images/drawings/balloons.svg";

const DrawingContainer = styled.div`
  margin: 4rem auto 1rem auto;
  max-width: 200px;
  opacity: 0.8;
  ${props => props.theme.drawingEffect}
`;

const EmptyStateDrawing = styled(BalloonsDrawing)`
  height: auto;
  max-width: 100%;
`;

interface OwnProps {
  forecast: {
    loading: boolean;
    weather: Array<Weather> | null;
  };
  getForecastRequest: Function;
  temperatureScale: TemperatureScaleSetting;
  addBookmark: Function;
  removeBookmark: Function;
  t: i18nT;
  bookmarks: Array<string>;
}

type Props = OwnProps & RouterProps;

interface State {
  weather?: Weather;
  loading: boolean;
  location: string;
}

class App extends React.Component<Props & RouteProps, State> {
  state = {
    loading: true,
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

  componentDidUpdate(prevProps: Props, prevState: State) {
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
    const { location } = this.state;
    const { addBookmark, removeBookmark, bookmarks, t } = this.props;
    const { loading } = this.props.forecast;
    const weather = this.props.forecast.weather[location];

    return (
      <AppContent>
        <Container>
          <Helmet>
            {weather ? (
              <title>Weather for {weather.city.name}</title>
            ) : (
              <title>{AppName}</title>
            )}
          </Helmet>

          <h1 className="screen-reader-text">{t("main.title")}</h1>

          <label className="screen-reader-text" htmlFor="search">
            {t("common.enterLocation")}
          </label>

          {weather !== undefined && (
            <Bookmark
              location={location}
              label={t("common.remember")}
              checked={bookmarks.includes(location)}
              onSelect={() => addBookmark(location)}
              onUnselect={() => removeBookmark(location)}
            />
          )}

          <SearchField
            value={location}
            name="search"
            id="search"
            onChange={e => this.setState({ location: e.target.value })}
            onBlur={() => this.updateForecast()}
            onKeyDown={e => e.key === "Enter" && this.updateForecast()}
            placeholder={t("common.enterLocation")}
          />

          {loading && <Loader />}

          {/* <Container textAlignCenter>
          <p>
            <button onClick={this.updateForecastByLocation}>
              {t("common.geolocationButton")}
            </button>
          </p>
        </Container> */}

          {weather === undefined && (
            <DrawingContainer>
              <EmptyStateDrawing />
            </DrawingContainer>
          )}

          {weather !== undefined && weather.cod !== "200" && !loading && (
            <Notice centerText type="error">
              {weather.message}
            </Notice>
          )}

          {weather !== undefined &&
            weather.cod === "200" &&
            !loading &&
            this.renderWeather()}
        </Container>
      </AppContent>
    );
  }

  renderWeather = () => {
    const { location } = this.state;
    const weather = this.props.forecast.weather[location];
    const temperatureScale = this.props.temperatureScale;

    return (
      <MainForecastWrapper>
        <CurrentWeather
          location={`${weather.city.name}, ${weather.city.country}`}
          forecast={weather.list[0]}
          temperatureScale={temperatureScale}
        />

        <ForecastDays
          forecasts={weather.list}
          renderItem={(item: Array<Forecast>, key: string) => (
            <Link to={`/locations/${location}/${key}`}>
              <Forecast
                date={format(key, "ddd")}
                temperature={getForecastMax(item)}
                temperatureScale={temperatureScale}
              />
            </Link>
          )}
        />
      </MainForecastWrapper>
    );
  };
}

const mapStateToProps = ({ forecast, bookmarks, settings }: GlobalState) => ({
  forecast,
  bookmarks,
  temperatureScale: settings.temperatureScale
});

export default compose(
  withNamespaces(),
  connect(
    mapStateToProps,
    { getForecastRequest, addBookmark, removeBookmark }
  )
)(App);
