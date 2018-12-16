import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  font-size: 1.75rem;
  font-weight: normal;
  padding: 1rem;
  line-height: 1em;
  background: transparent;
  color: ${props => props.theme.main};
  outline: none;
  transition: 0.1s;
  cursor: pointer;

  &:hover,
  &:focus {
    transform: scale(1.3);
  }
`;

interface Props {
  onClick: Function;
}

const RemoveButton = (props: Props) => {
  return <Button onClick={() => props.onClick()}>&times;</Button>;
};

export default RemoveButton;
