import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";
import { findByTestAttr } from "../../../Utils/testHelpers/testHelpers";

const setUp = (props = {}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe("Footer component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render wo errors", () => {
    const wrapper = findByTestAttr(component, "footerComponent");
    expect(wrapper.length).toBe(1);
  });

  it("Year should equal year", () => {
    const wrapper = findByTestAttr(component, "footerComponent");
    const componentYear = parseInt(wrapper.text().replace(/\D/g, ""));
    const year = new Date().getFullYear();
    expect(componentYear).toBe(year);
  });
});
