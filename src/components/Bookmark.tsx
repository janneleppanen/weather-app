import * as React from "react";

import { Container } from "../common";

interface Props {
  location: string;
  label: string;
  checked: boolean;
  onSelect?: (e: React.FormEvent) => void;
  onUnselect?: (e: React.FormEvent) => void;
}

const Bookmark = (props: Props) => {
  const { onSelect, onUnselect, checked, label } = props;
  function onChange(e: FormInputEventWithChecked) {
    if (e.target.checked && onSelect) {
      onSelect(e);
    }
    if (!e.target.checked && onUnselect) {
      onUnselect(e);
    }
  }

  return (
    <Container textAlignCenter>
      <label>
        <input type="checkbox" onChange={onChange} checked={checked} /> {label}
      </label>
    </Container>
  );
};

export default Bookmark;
