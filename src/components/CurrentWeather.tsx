import * as React from "react";
import { format } from "date-fns";

import { displayTemperature } from "../utils/temperature";
import styled, { css } from "styled-components";

interface Props {
  forecast: Forecast;
  location: String;
  temperatureScale: TemperatureSetting;
}

const Wrapper = styled.div`
  padding: 1rem;
`;

const P = styled.p<{ noMargin: boolean }>`
  opacity: 0.6;
  ${(props: any) =>
    props.noMargin &&
    css`
      margin: 0;
    `};
`;

const Temperature = styled.p`
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
`;

const CurrentWeather = (props: Props) => {
  const { forecast, location, temperatureScale } = props;
  return (
    <Wrapper>
      <P noMargin>{location}</P>
      <P noMargin>{format(forecast.dt, "ddd, MMM D")}</P>
      <P noMargin>{forecast.weather[0].description}</P>
      <Temperature>
        {displayTemperature(forecast.main.temp, temperatureScale)}
      </Temperature>
    </Wrapper>
  );
};

export default CurrentWeather;
