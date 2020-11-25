import { shallow } from "enzyme";
import React from "react";
import { Account } from "./Account";
import { Button } from "./Button";
import { Exchanger } from "./Exchanger";

describe("Exchanger", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("renders component", () => {
    const component = shallow(<Exchanger />);
    expect(component).toHaveLength(1);
  });

  it("renders two Account components for base and quote currencies", () => {
    const component = shallow(<Exchanger />);
    expect(component.find(Account)).toHaveLength(2);
  });

  it("updates base currency amount when base Account onChange is called", async () => {
    const component = shallow(<Exchanger />);
    const props = component.find(Account).at(0).props();

    props.onChange("10");

    const updatedProps = component.find(Account).at(0).props();
    expect(updatedProps.amount).toStrictEqual("10");
  });

  it("updates quote currency amount with converted amount when base Account onChange is called", async () => {
    const component = shallow(<Exchanger />);
    const baseAcountProps = component.find(Account).at(0).props();

    baseAcountProps.onChange("10");

    const quoteAccountProps = component.find(Account).at(1).props();
    expect(quoteAccountProps.amount).toStrictEqual("13.51");
  });

  it("updates quote currency amount when quote Account onChange is called", async () => {
    const component = shallow(<Exchanger />);
    const props = component.find(Account).at(1).props();

    props.onChange("55");

    const updatedProps = component.find(Account).at(1).props();
    expect(updatedProps.amount).toStrictEqual("55");
  });

  it("updates base currency amount with converted amount when quote Account onChange is called", async () => {
    const component = shallow(<Exchanger />);
    const quoteAccountProps = component.find(Account).at(1).props();

    quoteAccountProps.onChange("10");

    const baseAccountProps = component.find(Account).at(0).props();
    expect(baseAccountProps.amount).toStrictEqual("7.4");
  });

  it("renders Exchange button with no onClick handler when base amount is empty", async () => {
    const dispatch = jest.fn();
    jest.spyOn(React, "useContext").mockReturnValue({ state: [], dispatch });

    const component = shallow(<Exchanger />);

    const props = component.find(Button).at(1).props();
    expect(props.children).toStrictEqual("Exchange");
    expect(props.onClick).toStrictEqual(undefined);
  });

  it("renders Exchange button that calls convert action to AccountContext when clicked and base amount is not empty", async () => {
    const dispatch = jest.fn();
    jest.spyOn(React, "useContext").mockReturnValue({ state: [], dispatch });
    const component = shallow(<Exchanger />);

    component.find(Account).at(0).props().onChange("10");

    const props = component.find(Button).at(1).props();
    expect(typeof props.onClick).toStrictEqual("function");
    props.onClick!();

    expect(dispatch).toBeCalledWith({
      type: "Convert",
      payload: {
        base: { amount: "10", ccy: "GBP" },
        quote: { amount: "13.51", ccy: "EUR" },
      },
    });
  });

  it("renders Cancel button that does nothing", async () => {
    const component = shallow(<Exchanger />);

    const cancelButton = component.find(Button).at(0);
    expect(cancelButton.props().children).toStrictEqual("Cancel");
  });
});
