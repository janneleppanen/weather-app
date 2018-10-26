import styled from "styled-components";

const Background = styled.div`
  min-height: 100%;
  background: ${props => props.theme.background};
  padding: 1px;
  /* padding: ${props => props.theme.space}rem ${props =>
  props.theme.space}rem; */
`;

export default Background;
