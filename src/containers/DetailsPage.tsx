import * as React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

import { Container } from "../common";
import { groupForecastsByDays } from "../utils/forecast";
import { AppName } from "../config/constants";
import {
  displayTemperature,
  getConvertedTemperature
} from "../utils/temperature";
import RangeChart from "../components/RangeChart";

interface OwnProps {
  forecast: Weather;
  temperatureScale: TemperatureScaleSetting;
}

type Props = OwnProps & RouterProps;

class DetailsPage extends React.Component<Props> {
  render() {
    const weather = this.props.forecast;
    const { date } = this.props.match.params;
    const grouped = groupForecastsByDays(weather.list);
    const currentDayForecastList = grouped[date];
    const chartData = currentDayForecastList.map((forecast: Forecast) => {
      return {
        temperature: getConvertedTemperature(
          forecast.main.temp,
          this.props.temperatureScale
        ),
        time: forecast.dt
      };
    });
    const dateDisplay = format(date, "Do MMM YYYY");
    return (
      <Container>
        <Helmet>
          <title>
            {weather.city.name} on {dateDisplay} | {AppName}
          </title>
        </Helmet>
        <RangeChart data={chartData} />
        {currentDayForecastList.map(this.renderForecast)}
      </Container>
    );
  }

  renderForecast = (forecast: Forecast) => {
    const { temperatureScale } = this.props;
    return (
      <div key={forecast.dt}>
        <p>Date: {format(forecast.dt_txt, "D.M.YYYY HH:mm")}</p>
        <p>
          Temp: {displayTemperature(forecast.main.temp, temperatureScale)} |{" "}
          {displayTemperature(forecast.main.temp_max, temperatureScale)} /{" "}
          {displayTemperature(forecast.main.temp_min, temperatureScale)}
        </p>
        <p>Humidity: {forecast.main.humidity}</p>
        <p>{forecast.weather[0].description}</p>
        <p>Wind speed: {forecast.wind.speed}</p>
        {forecast.snow && <p>Snow: {forecast.snow["3h"]}</p>}
        {forecast.rain && <p>Rain: {forecast.rain["3h"]}</p>}
        <p>Clouds: {forecast.clouds.all}</p>
        <hr />
      </div>
    );
  };
}

const mapStateToProps = (state: GlobalState, props: Props) => {
  const location = props.match.params.location;

  return {
    forecast: state.forecast.weather[location],
    temperatureScale: state.settings.temperatureScale
  };
};

export default connect(mapStateToProps)(DetailsPage);
