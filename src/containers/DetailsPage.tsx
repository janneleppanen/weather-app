import * as React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";

import { Container } from "../common";
import { groupForecastsByDays } from "../utils/forecast";
import {
  displayTemperature,
  getConvertedTemperature
} from "../utils/temperature";
import RangeChart from "../components/RangeChart";

interface OwnProps {
  forecast: {
    test: string;
    loading: boolean;
    weather: Weather;
  };
  temperatureScale: TemperatureSetting;
}

type Props = OwnProps & RouterProps;

class DetailsPage extends React.Component<Props> {
  render() {
    const { weather } = this.props.forecast;
    const { date } = this.props.match.params;
    const grouped = groupForecastsByDays(weather.list);
    const currentDayForecastList = grouped[date];
    const chartData = currentDayForecastList.map(forecast => {
      return {
        temperature: getConvertedTemperature(
          forecast.main.temp,
          this.props.temperatureScale
        ),
        time: forecast.dt
      };
    });
    return (
      <Container>
        <RangeChart data={chartData} />
        {currentDayForecastList.map(this.renderForecast)}
      </Container>
    );
  }

  renderForecast = forecast => {
    const { temperatureScale } = this.props;
    return (
      <div key={forecast.dt}>
        <p>Date: {format(forecast.dt_txt, "D.M.YYYY H:mm")}</p>
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

const mapStateToProps = (state: GlobalState) => {
  return {
    forecast: state.forecast,
    temperatureScale: state.settings.temperature
  };
};

export default connect(mapStateToProps)(DetailsPage);
