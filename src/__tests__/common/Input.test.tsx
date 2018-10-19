import * as React from "react";
import * as enzyme from "enzyme";

import Input from "../../common/Input";

it("renders button", () => {
  const wrapper = enzyme.shallow(<Input value="inputvalue" />);
  expect(wrapper.props().value).toBe("inputvalue");
});
