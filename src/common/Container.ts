import styled from "styled-components";

interface Props {
  textAlignCenter: boolean;
}

const Container = styled.div<Props>`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;

  ${(props: Props) =>
    props.textAlignCenter &&
    `
    text-align: center;
  `};
`;

export default Container;
