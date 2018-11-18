import * as React from "react";
import styled from "styled-components";
import { Spring } from "react-spring";

const AppContentWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

interface Props {
  children: React.ReactNode;
}

const AppContent = (props: Props) => {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {style => (
        <AppContentWrapper style={style}>{props.children}</AppContentWrapper>
      )}
    </Spring>
  );
};

export default AppContent;
