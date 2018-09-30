import styled from "styled-components";

const HorizontalScrollList = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 0 -${props => props.theme.space};
`;

export default HorizontalScrollList;
