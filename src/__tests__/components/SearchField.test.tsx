import * as React from "react";
import * as enzyme from "enzyme";

import SearchField from "../../components/SearchField";

it("renders button", () => {
  const wrapper = enzyme.shallow(<SearchField value="inputvalue" />);
  expect(wrapper.props().children[0].props.value).toBe("inputvalue");
});
