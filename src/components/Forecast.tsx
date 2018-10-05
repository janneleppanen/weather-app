import * as React from "react";
import styled from "styled-components";

import { displayCelciusFromKelvin } from "../utils/temperature";

interface Props {
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  date: string;
}

const Wrapper = styled.div`
  border-right: 1px solid #eee;
  padding: 0.5rem;
  min-width: 6rem;
`;

const Date = styled.p`
  margin: 0;
  font-size: 0.825rem;
  opacity: 0.6;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
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
      <Date>{date}</Date>
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
