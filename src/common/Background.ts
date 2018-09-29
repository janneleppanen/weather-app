import styled from "styled-components";

const Background = styled.div`
  min-height: 100%;
  background: ${props => props.theme.background};
  border-top: 0.5rem solid ${props => props.theme.main};
  padding: ${props => props.theme.space};
`;

export default Background;
