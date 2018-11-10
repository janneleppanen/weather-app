import styled from "styled-components";

interface Props {
  textAlignCenter?: boolean;
  padded?: boolean;
}

const Container = styled.div<Props>`
  position: relative;
  max-width: ${props => props.theme.maxWidth}px;
  margin: 0 auto;
  overflow: auto;

  ${(props: Props) => props.padded && `padding: 1rem;`} ${(props: Props) =>
    props.textAlignCenter &&
    `
    text-align: center;
  `};
`;

export default Container;
