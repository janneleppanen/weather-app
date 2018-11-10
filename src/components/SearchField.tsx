import * as React from "react";
import styled from "styled-components";

import { ReactComponent as SearchIconComponent } from "../images/icons/search.svg";

const Wrapper = styled.div`
  position: relative;
  margin: 4rem auto 0 auto;
  max-width: 300px;
`;

const InputElement = styled.input`
  box-sizing: border-box;
  text-align: center;
  padding: 1rem 3rem 1rem 3rem;
  border: none;
  transition: all 0.2s;
  border-bottom: 3px solid #eee;
  display: block;
  background-color: transparent;
  width: 100%;

  &:focus {
    outline-offset: 0;
    outline: none;
    border-bottom-color: ${props => props.theme.main};
  }
  &::placeholder {
    color: ${props => props.theme.medium};
  }
`;

const SubmitButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  color: #ccc;

  &:focus,
  &:hover {
    cursor: pointer;
    outline: none;
    color: ${props => props.theme.main};
  }
`;

const SearchIcon = styled(SearchIconComponent)`
  fill: currentColor;
  width: 2rem;
  height: 2rem;
  transition: all 0.1s;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const SearchField = (props: Props) => {
  const { value, ...restProps } = props;
  return (
    <Wrapper>
      <InputElement value={value} {...restProps} />
      <SubmitButton>
        <SearchIcon />
      </SubmitButton>
    </Wrapper>
  );
};

export default SearchField;
