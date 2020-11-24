import { shallow } from "enzyme";
import React from "react";
import { TotalAmount } from "./TotalAmount";

describe("TotalAmount", () => {
  it("renders component", () => {
    const component = shallow(<TotalAmount amount="24.00" ccy="USD" />);
    expect(component).toHaveLength(1);
  });

  it("renders text correctly", () => {
    const component = shallow(<TotalAmount amount="24.00" ccy="USD" />);
    expect(component.text()).toStrictEqual("You have $24.00");
  });
});
