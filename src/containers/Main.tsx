import * as React from "react";
import { RouteProps } from "react-router";
import _ from "lodash";
import { connect } from "react-redux";
import { compose } from "redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import MainForecastWrapper from "../components/MainForecastWrapper";
import Bookmark from "../components/Bookmark";
import { Container, Notice, AppContent } from "../common";
import Forecast from "../components/Forecast";
import CurrentWeather from "../components/CurrentWeather";
import ForecastDays from "../components/ForecastDays";
import SearchField from "../components/SearchField";
import MainIcon from "../components/MainIcon";
import { getForecastRequest } from "../redux/ForecastReducer";
import { addBookmark, removeBookmark } from "../redux/BookmarkReducer";
import { setLastLocation } from "../redux/LastLocationReducer";
import { getForecastMax } from "../utils/forecast";
import { getForecastByCoords } from "../services/OpenWeatherMap";
import { AppName } from "../config/constants";
import { ReactComponent as MarkerSVG } from "../images/icons/marker.svg";

const CurrentLocationButton = styled.button`
  position: absolute;
  top: 1px;
  left: 1px;
  padding: 1rem 0.75rem;
  border: none;
  background: transparent;
  color: ${props => props.theme.main};
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.2);
  }
`;

const MarkerIcon = styled(MarkerSVG)`
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
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
  setLastLocation: Function;
  t: i18nT;
  bookmarks: Array<string>;
  lastLocation: string;
}

type Props = OwnProps & RouterProps;

interface State {
  weather?: Weather;
  loading: boolean;
  location: string;
}

class Main extends React.Component<Props & RouteProps, State> {
  state = {
    loading: true,
    location: ""
  };

  componentDidMount() {
    let { location } = this.state;
    if (this.props.match.params.hasOwnProperty("location")) {
      location = this.props.match.params.location;
      this.setState({ location });
    } else if (this.props.lastLocation) {
      this.props.history.push(`/locations/${this.props.lastLocation}`);
      this.setState({ location: this.props.lastLocation });
    }
    if (location) this.props.getForecastRequest(location);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { location } = this.props.match.params;
    if (location !== prevProps.match.params.location) {
      this.props.getForecastRequest(location);
      this.props.setLastLocation(location);
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

    const weather = this.props.match.params.location
      ? this.props.forecast.weather[this.props.match.params.location]
      : null;

    let mainIcon = loading ? "loading" : "empty";
    mainIcon =
      weather && weather.list ? weather.list[0].weather[0].main : mainIcon;
    return (
      <AppContent>
        <Container>
          <Helmet>
            {this.props.lastLocation ? (
              <title>
                {t("head.weatherFor")} {this.props.lastLocation}
              </title>
            ) : (
              <title>{AppName}</title>
            )}
          </Helmet>

          <h1 className="screen-reader-text">{t("main.title")}</h1>

          <CurrentLocationButton onClick={this.updateForecastByLocation}>
            <MarkerIcon />
          </CurrentLocationButton>

          <label className="screen-reader-text" htmlFor="search">
            {t("common.enterLocation")}
          </label>

          <SearchField
            value={location}
            name="search"
            id="search"
            onChange={e => this.setState({ location: e.target.value })}
            onBlur={() => this.updateForecast()}
            onKeyDown={e => e.key === "Enter" && e.currentTarget.blur()}
            placeholder={t("common.enterLocation")}
            contentBefore={() => {
              if (location) {
                return (
                  <Bookmark
                    location={location}
                    label={t("common.remember")}
                    checked={bookmarks.includes(location)}
                    onSelect={() => addBookmark(location)}
                    onUnselect={() => removeBookmark(location)}
                  />
                );
              }
              return null;
            }}
          />

          {weather && weather.cod === "200" && <MainIcon icon={mainIcon} />}

          {weather !== undefined &&
            weather !== null &&
            weather.cod !== "200" &&
            !loading && (
              <Notice centerText type="error">
                {weather.message}
              </Notice>
            )}

          {weather !== undefined &&
            weather !== null &&
            weather.cod === "200" &&
            !loading &&
            this.renderWeather()}
        </Container>
      </AppContent>
    );
  }

  renderWeather = () => {
    const { location } = this.state;
    const weather = this.props.match.params.location
      ? this.props.forecast.weather[this.props.match.params.location]
      : null;
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

const mapStateToProps = ({
  forecast,
  bookmarks,
  settings,
  lastLocation
}: GlobalState) => ({
  forecast,
  bookmarks,
  temperatureScale: settings.temperatureScale,
  lastLocation
});

export default compose(
  withNamespaces(),
  connect(
    mapStateToProps,
    { getForecastRequest, addBookmark, removeBookmark, setLastLocation }
  )
)(Main);
