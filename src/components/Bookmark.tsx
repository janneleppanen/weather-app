import * as React from "react";
import styled from "styled-components";

import { ReactComponent as StarIcon } from "../images/icons/star.svg";
import { ReactComponent as StarOutlineIcon } from "../images/icons/star-outline.svg";
import { ScreenReaderText } from "../config/global-styles";

const Label = styled.label`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
    fill: ${props => (checked ? props.theme.main : "#ccc")};
    width: 2rem;
    border-radius: 50%;
    padding: 0.2rem;
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
    <Label>
      <Checkbox type="checkbox" onChange={onChange} checked={checked} />{" "}
      <Star />
    </Label>
  );
};

export default Bookmark;
