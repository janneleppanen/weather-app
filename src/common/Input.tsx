import * as React from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const InputElement = styled.input`
  text-align: center;
  padding: 1rem 2rem;
  border: none;
  transition: all 0.2s;
  border-bottom: 3px solid #eee;
  display: block;
  margin: 4rem auto 0 auto;
  background-color: transparent;
  &:focus {
    outline-offset: 0;
    outline: none;
    border-bottom-color: ${props => props.theme.main};
  }
  &::placeholder {
    color: ${props => props.theme.medium};
  }
`;

class Input extends React.Component<Props, {}> {
  render() {
    const { value, ...restProps } = this.props;
    return <InputElement value={value} {...restProps} />;
  }
}

export default Input;
