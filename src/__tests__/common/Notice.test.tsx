import * as React from "react";
import * as enzyme from "enzyme";

import Notice from "../../common/Notice";

it("renders notice", () => {
  const wrapper = enzyme.shallow(<Notice>Warning text</Notice>);
  expect(wrapper.contains("Warning text")).toBe(true);
});
