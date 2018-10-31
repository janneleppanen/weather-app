import * as React from "react";
import styled from "styled-components";

import { groupForecastsByDays } from "../utils/forecast";

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 0;
`;

const Item = styled.div`
  flex: 1;
`;

interface Props {
  forecasts: Array<Forecast>;
  renderItem: Function;
}

const ForecastDays = (props: Props) => {
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
