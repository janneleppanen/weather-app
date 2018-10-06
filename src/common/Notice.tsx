import styled from "styled-components";

interface Props {
  centerText: boolean;
  type?: "notice" | "error" | "warning";
}

const Notice = styled.p<Props>`
  margin: 1rem 0;
  color: ${props => props.theme.text}
    ${props => props.centerText && "text-align: center"};
`;

export default Notice;
