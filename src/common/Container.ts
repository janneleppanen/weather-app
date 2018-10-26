import styled from "styled-components";

interface Props {
  textAlignCenter?: boolean;
  padded?: boolean;
}

const Container = styled.div<Props>`
  max-width: ${props => props.theme.maxWidth}px;
  margin: 0 auto;

  ${(props: Props) => props.padded && `padding: 1rem;`} ${(props: Props) =>
    props.textAlignCenter &&
    `
    text-align: center;
  `};
`;

export default Container;
