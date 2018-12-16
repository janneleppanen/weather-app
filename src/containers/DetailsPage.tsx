import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";

import { Container } from "../common";
import SubHeader from "../components/SubHeader";
import { groupForecastsByDays } from "../utils/forecast";
import { AppName } from "../config/constants";
import {
  displayTemperature,
  getConvertedTemperature
} from "../utils/temperature";
import RangeChart from "../components/RangeChart";

const DetailsList = styled.div`
  margin: 1rem;
`;

const DetailsListItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const DetailsListItemTitle = styled.h2`
  width: 100%;
`;

const Detail = styled.div`
  width: 50%;
  margin-bottom: 1rem;
`;

const DetailTitle = styled.div`
  font-weight: bold;
`;

interface OwnProps {
  forecast: Weather;
  temperatureScale: TemperatureScaleSetting;
  t: i18nT;
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
        value: getConvertedTemperature(
          forecast.main.temp,
          this.props.temperatureScale
        ),
        date: new Date(forecast.dt * 1000)
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

        <SubHeader
          backTo="/locations"
          title={`${weather.city.name}, ${dateDisplay}`}
        />

        <RangeChart data={chartData} />

        <DetailsList>
          {currentDayForecastList.map(this.renderForecast)}
        </DetailsList>
      </Container>
    );
  }

  renderForecast = (forecast: Forecast) => {
    const { temperatureScale, t } = this.props;
    return (
      <DetailsListItem key={forecast.dt}>
        <DetailsListItemTitle>
          {format(forecast.dt_txt, "D.M.YYYY HH:mm")} –{" "}
          {forecast.weather[0].description}
        </DetailsListItemTitle>
        <Detail>
          <DetailTitle>{t("details.temperature")}</DetailTitle>
          {displayTemperature(forecast.main.temp_max, temperatureScale)} /{" "}
          {displayTemperature(forecast.main.temp_min, temperatureScale)}
        </Detail>
        <Detail>
          <DetailTitle>{t("details.humidity")}</DetailTitle>
          {forecast.main.humidity}%
        </Detail>
        <Detail>
          <DetailTitle>{t("details.windSpeed")}</DetailTitle>
          {forecast.wind.speed} m/s
        </Detail>

        {forecast.snow && (
          <Detail>
            <DetailTitle>{t("details.snow")}</DetailTitle>
            {forecast.snow["3h"]}
          </Detail>
        )}

        {forecast.rain && (
          <Detail>
            <DetailTitle>{t("details.rain")}</DetailTitle>
            {forecast.rain["3h"]}
          </Detail>
        )}

        <Detail>
          <DetailTitle>{t("details.clouds")}</DetailTitle>
          {forecast.clouds.all}
        </Detail>
      </DetailsListItem>
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

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(DetailsPage);
