import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as ArrowIcon } from "../images/icons/arrow.svg";
import { Container } from "../common";

interface Props {
  backTo: string;
  title: string;
}

const Wrapper = styled.header``;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Arrow = styled(ArrowIcon)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  fill: currentColor;
`;

const Title = styled.h2`
  flex: 1;
  font-weight: normal;
  margin: 0;
  color: ${props => props.theme.text};
`;

const BackButton = styled(Link)`
  padding: 1rem 0.5rem;
  display: flex;
  font-size: 1.25rem;
  color: ${props => props.theme.main};
`;

const SubHeader = (props: Props) => {
  return (
    <Wrapper>
      <HeaderContainer>
        <BackButton to={props.backTo}>
          <Arrow />

          <Title>{props.title}</Title>
        </BackButton>
      </HeaderContainer>
    </Wrapper>
  );
};

export default SubHeader;
