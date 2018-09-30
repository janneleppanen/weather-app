import * as React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { displayCelciusFromKelvin } from "../utils/temperature";

interface Props {
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  date: number;
}

const Wrapper = styled.div`
  border-right: 1px solid #eee;
  padding: 0.5rem;
  min-width: 6rem;
`;

const Date = styled.p`
  margin: 0;
  font-size: 0.825rem;
`;

const Title = styled.p`
  font-weight: bold;
  margin: 0;
`;

const SecodaryText = styled.span`
  opacity: 0.6;
  font-size: 0.825rem;
`;

const Forecast = (props: Props) => {
  const { temperature, temperatureMin, temperatureMax, date } = props;
  return (
    <Wrapper>
      <Date>{format(date, "Do MMM ha")}</Date>
      <Title>{displayCelciusFromKelvin(temperature)}</Title>
      <SecodaryText>
        {displayCelciusFromKelvin(temperatureMin)}
        {" / "}
        {displayCelciusFromKelvin(temperatureMax)}
      </SecodaryText>
    </Wrapper>
  );
};

export default Forecast;
