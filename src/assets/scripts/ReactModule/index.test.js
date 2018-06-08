import React from "react";
import { shallow } from "enzyme";
import ReactModule from "./index";

describe("The ReactModule component", () => {
  it("renders a default greeting to the user", () => {
    const wrapper = shallow(<ReactModule />);

    const greeting = wrapper.find("h2").text();
    expect(greeting).toEqual("Hello world!");
  });

  it("renders the greeting prop to the user", () => {
    const wrapper = shallow(<ReactModule greeting="Hi" />);

    const greeting = wrapper.find("h2").text();
    expect(greeting).toEqual("Hi world!");
  });
});
