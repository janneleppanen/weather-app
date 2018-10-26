import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../common";

interface Props {
  backTo: string;
  title: string;
}

const Wrapper = styled.header`
  background: ${props => props.theme.headerBackground};
  border-bottom: ${props => props.theme.headerBorder};
`;

const BackButton = styled(Link)`
  padding: 0.5rem 1rem;
  display: inline-block;
  font-size: 1.25rem;
`;

const SubHeader = (props: Props) => {
  return (
    <Wrapper>
      <Container>
        <BackButton to={props.backTo}>&larr;</BackButton>
        {props.title}
      </Container>
    </Wrapper>
  );
};

export default SubHeader;
