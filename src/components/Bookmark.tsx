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
  function onChange(e: any) {
    if (e.target.checked && props.onSelect) {
      props.onSelect(e);
    }
    if (!e.target.checked && props.onUnselect) {
      props.onUnselect(e);
    }
  }

  return (
    <Container textAlignCenter>
      <label>
        <input type="checkbox" onChange={onChange} checked={props.checked} />{" "}
        {props.label}
      </label>
    </Container>
  );
};

export default Bookmark;
