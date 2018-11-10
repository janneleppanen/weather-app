import * as React from "react";
import * as enzyme from "enzyme";

import SearchField from "../../components/SearchField";

it("renders button", () => {
  const wrapper = enzyme.shallow(<SearchField value="inputvalue" />);
  expect(wrapper.props().value).toBe("inputvalue");
});
