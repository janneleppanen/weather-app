import * as React from "react";
import styled, { keyframes, css } from "styled-components";
import { rgba } from "polished";

interface Props {
  label: string;
  checked: boolean;
  onClick: Function;
}

const glow = (colorStart, colorEnd) => keyframes`
  from {
    box-shadow: 0 0 0 0 ${colorStart};
  }
  to {
    box-shadow: 0 0 0 .35rem ${colorEnd};
  }
`;

const Button = styled.button<any>`
  border: none;
  background: ${props => (props.checked ? props.theme.main : "transparent")};
  padding: 0.5rem 1.25rem;
  color: ${props => (props.checked ? "white" : props.theme.text)};
  outline: none;
  border-radius: ${props => props.theme.borderRadius}px;
  cursor: pointer;
  ${props =>
    props.checked
      ? css`
          animation: ${props =>
              glow(rgba(props.theme.main, 1), rgba(props.theme.main, 0))}
            0.3s 0.05s cubic-bezier(0.645, 0.045, 0.355, 1);
        `
      : ""};
`;

const ToggleButton = (props: Props) => {
  const { label, onClick, checked } = props;
  return (
    <Button onClick={onClick} checked={checked}>
      {label}
    </Button>
  );
};

export default ToggleButton;
