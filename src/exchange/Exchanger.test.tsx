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

  it("updates base currency amount when Account onChange is called", async () => {
    const component = shallow(<Exchanger />);
    const props = component.find(Account).at(0).props();

    props.onChange("123");

    const updatedProps = component.find(Account).at(0).props();
    expect(updatedProps.amount).toStrictEqual("123");
  });

  it("updates quote currency amount when Account onChange is called", async () => {
    const component = shallow(<Exchanger />);
    const props = component.find(Account).at(1).props();

    props.onChange("55");

    const updatedProps = component.find(Account).at(1).props();
    expect(updatedProps.amount).toStrictEqual("55");
  });
});
