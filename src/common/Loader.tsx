import * as React from "react";
import styled, { keyframes } from "styled-components";

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const rotate = keyframes`
  0% { 
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(360deg) scale(1.5);
  }
  100% {
    transform: rotate(720deg) scale(1);
  }
`;

const LoaderWrapper = styled.div`
  padding: 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fade} 1s 0.5s forwards;
  opacity: 0;
`;

const LoaderIcon = styled.div`
  width: 1rem;
  height: 1rem;
  background: tomato;
  animation: ${rotate} 4s linear infinite;
`;

const Loader = () => (
  <LoaderWrapper>
    <LoaderIcon />
  </LoaderWrapper>
);

export default Loader;
