import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { Transition } from "react-spring";

import { Loader } from "../common";
import { ReactComponent as BalloonsDrawing } from "../images/drawings/balloons.svg";
import { ReactComponent as RainSVG } from "../images/icons/rain.svg";
import { ReactComponent as ClearSVG } from "../images/icons/clear.svg";
import { ReactComponent as SnowSVG } from "../images/icons/snow.svg";

const MainIconWrapper = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  color: tomato;
`;
const iconAnimation = keyframes`
  0% {
    top: 0;
    transform: rotate(6deg);
  }

  16% {
    top: 1rem;
  }

  32% {
    top: 0;
  }

  50% {
    top: 1rem;
    transform: rotate(-6deg);
  }

  66% {
    top: 0;
  }

  82% {
    top: 1rem;
  }

  100% {
    top: 0;
    transform: rotate(6deg);
  }
`;

const iconSyles = css`
  position: relative;
  fill: currentColor;
  width: 160px;
  animation: ${iconAnimation} 15s ease-in-out infinite;
`;

const RainIcon = styled(RainSVG)`
  ${iconSyles}
`;

const ClearIcon = styled(ClearSVG)`
  ${iconSyles}
`;

const SnowIcon = styled(SnowSVG)`
  ${iconSyles}
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
  console.log(icon);
  if (icon === "loading") {
    return <Loader />;
  }

  if (icon === "Rain") {
    return <RainIcon />;
  }

  if (icon === "Snow") {
    return <SnowIcon />;
  }

  if (icon === "Clear") {
    return <ClearIcon />;
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
