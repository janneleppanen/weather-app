import * as React from "react";
import styled from "styled-components";

import { displayCelciusFromKelvin } from "../utils/temperature";

interface Props {
  temperature: number;
  temperatureMin?: number;
  temperatureMax?: number;
  date: string;
}

const Wrapper = styled.div`
  border-right: 1px solid #eee;
  padding: 0.25rem;
  text-align: center;
  &:last-child {
    border: none;
  }
`;

const Date = styled.p`
  margin: 0;
  font-size: 0.825rem;
  opacity: 0.6;
`;

const Title = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const Forecast = (props: Props) => {
  const { temperature, date } = props;
  return (
    <Wrapper>
      <Date>{date}</Date>
      <Title>{displayCelciusFromKelvin(temperature)}</Title>
    </Wrapper>
  );
};

export default Forecast;
