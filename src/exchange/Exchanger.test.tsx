import { shallow } from "enzyme";
import React from "react";
import { Account } from "./Account";
import { Exchanger } from "./Exchanger";

describe("Exchanger", () => {
  it("renders component", () => {
    const component = shallow(<Exchanger />);
    expect(component).toHaveLength(1);
  });

  it("renders two Account components for base and quote currencies", () => {
    const component = shallow(<Exchanger />);
    expect(component.find(Account)).toHaveLength(2);
  });
});
