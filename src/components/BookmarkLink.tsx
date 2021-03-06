import { Link } from "react-router-dom";
import styled from "styled-components";

export default styled(Link)`
  display: block;
  padding: 1rem 0;
  transition: all 0.15s;
  color: ${props => props.theme.text}

  &:last-child {
    border: none;
  }

  &:hover {
    color: ${props => props.theme.main};
  }
`;
