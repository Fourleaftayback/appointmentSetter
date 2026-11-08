import React from "react";
import { shallow } from "enzyme";
import FormItem from "./FormItem";
import {
  findByTestAttr,
  checkProps
} from "../../../Utils/testHelpers/testHelpers";

const setUp = (props = {}) => {
  const component = shallow(<FormItem {...props} />);
  return component;
};

describe("FormItem component", () => {
  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {
        type: "text",
        name: "name",
        value: "value",

        onChange: () => {}
      };
      const propsError = checkProps(FormItem, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });
  describe("Renders", () => {
    let component;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        type: "text",
        name: "name",
        value: "",

        onChange: mockFunc
      };
      component = setUp(props);
    });

    it("Should Render a button", () => {
      const form = findByTestAttr(component, "formItemComponent");
      expect(form.length).toBe(1);
    });

    it("The value should be = hello", () => {
      const form = findByTestAttr(component, "formItemComponent");
      const input = form.find(".form-control");
      input.props.value = "hello";
      expect(input.props.value).toEqual("hello");
    });
    it("Should call changeHandler onChange on input", () => {
      const form = findByTestAttr(component, "formItemComponent");
      const input = form.find(".form-control");
      input.simulate("change");
      expect(mockFunc.mock.calls.length).toBe(1);
    });
  });
  //if you pass in error is invalid class active
  //check errors text if errors is passed in

  describe("Check when Errors passed", () => {
    let component;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        type: "email",
        name: "name",
        value: "",
        error: "Email is not Valid",
        onChange: mockFunc
      };
      component = setUp(props);
    });
    it("Checking if classname is-invalid active", () => {
      const form = findByTestAttr(component, "formItemComponent");
      const isInvalid = form.find(".form-control").hasClass("is-invalid");
      expect(isInvalid).toBe(true);
    });
    it("Checking if err feedback exist", () => {
      const form = findByTestAttr(component, "formItemComponent");
      const errfeedback = form.exists(".invalid-feedback");
      expect(errfeedback).toBe(true);
    });
  });
});
