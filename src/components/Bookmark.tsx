import * as React from "react";
import styled from "styled-components";

import { ReactComponent as StarIcon } from "../images/icons/star.svg";
import { ReactComponent as StarOutlineIcon } from "../images/icons/star-outline.svg";
import { ScreenReaderText } from "../config/global-styles";

const Checkbox = styled.input`
  ${ScreenReaderText}

  &:focus,
  &:hover {
    & + * {
      background: whitesmoke;
    }
  }
`;

interface Props {
  location: string;
  label: string;
  checked: boolean;
  onSelect?: (e: React.FormEvent) => void;
  onUnselect?: (e: React.FormEvent) => void;
}

const Bookmark = (props: Props) => {
  const { onSelect, onUnselect, checked } = props;

  const Icon = checked ? StarIcon : StarOutlineIcon;

  const Star = styled(Icon)`
    fill: ${props => props.theme.main};
    max-width: 2rem;
    border-radius: 50%;
    padding: 0.2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
  `;

  function onChange(e: FormInputEventWithChecked) {
    if (e.target.checked && onSelect) {
      onSelect(e);
    }
    if (!e.target.checked && onUnselect) {
      onUnselect(e);
    }
  }

  return (
    <label>
      <Checkbox type="checkbox" onChange={onChange} checked={checked} />{" "}
      <Star />
    </label>
  );
};

export default Bookmark;
