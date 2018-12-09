import * as React from "react";
import styled from "styled-components";
import { Transition } from "react-spring";

import { Loader } from "../common";
import { ReactComponent as BalloonsDrawing } from "../images/drawings/balloons.svg";
import { ReactComponent as RainSVG } from "../images/icons/rain.svg";

const MainIconWrapper = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  color: tomato;
`;

const RainIcon = styled(RainSVG)`
  fill: currentColor;
  width: 200px;
`;

const DrawingContainer = styled.div`
  margin: 1rem auto;
  max-width: 200px;
  opacity: 0.8;
  ${props => props.theme.drawingEffect}
`;

const EmptyStateDrawing = styled(BalloonsDrawing)`
  height: auto;
  max-width: 100%;
`;

interface Props {
  icon?: string;
}

const MainIcon = (props: Props) => {
  const { icon } = props;

  if (icon === "loading") {
    return <Loader />;
  }

  if (icon === "Rain") {
    return <RainIcon />;
  }

  if (icon === "empty") {
    return (
      <DrawingContainer>
        <EmptyStateDrawing />
      </DrawingContainer>
    );
  }

  return <div>{icon}</div>;
};

export default (props: Props) => {
  return (
    <MainIconWrapper>
      <Transition
        items={props.icon}
        from={{ position: "absolute", opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {items => props => (
          <div style={props}>
            <MainIcon icon={items} />
          </div>
        )}
      </Transition>
    </MainIconWrapper>
  );
};
