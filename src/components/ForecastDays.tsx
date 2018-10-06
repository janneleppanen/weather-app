import * as React from "react";
import styled from "styled-components";

import { groupForecastsByDays } from "../utils/forecast";

const Wrapper = styled.div`
  display: flex;
  /* border-top: ${props => props.theme.lighter} 1px solid;
  background: ${props => props.theme.lighter}; */
  padding: 1rem 0;
`;

const Item = styled.div`
  flex: 1;
`;

const ForecastDays = props => {
  const grouped = groupForecastsByDays(props.forecasts);

  return (
    <Wrapper>
      {Object.keys(grouped).map(key => (
        <React.Fragment key={key}>
          <Item>{props.renderItem(grouped[key], key)}</Item>
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default ForecastDays;
