import styled from "styled-components";

const Background = styled.div`
  min-height: 100%;
  background: ${props => props.theme.background};
  padding: ${props => props.theme.space * 2}rem ${props => props.theme.space}rem;
`;

export default Background;
