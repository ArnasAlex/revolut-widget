import { shallow } from "enzyme";
import React from "react";
import { Account, Currency, Sign } from "./Account";
import { AmountInput } from "./AmountInput";
import { TotalAmount } from "./TotalAmount";
import { UnitExchangeRate } from "./UnitExchangeRate";

describe("Account", () => {
  it("renders component", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" onChange={jest.fn()} />
    );
    expect(component).toHaveLength(1);
  });

  it("renders AmountInput", () => {
    const onChange = jest.fn();
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" onChange={onChange} />
    );

    expect(component.find(AmountInput)).toHaveLength(1);
    const props = component.find(AmountInput).props();
    expect(props.value).toStrictEqual("10");
    expect(props.onChange).toStrictEqual(onChange);
  });

  it("renders currency of the account", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" onChange={jest.fn()} />
    );

    expect(component.find(Currency)).toHaveLength(1);
    expect(component.find(Currency).text()).toStrictEqual("EUR");
  });

  it("renders total amount of that currency account", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" onChange={jest.fn()} />
    );

    expect(component.find(TotalAmount)).toHaveLength(1);
    const props = component.find(TotalAmount).props();
    expect(props.amount).toStrictEqual("120");
    expect(props.ccy).toStrictEqual("EUR");
  });

  it("renders + sign next to the amount when currency is not base", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" onChange={jest.fn()} />
    );

    expect(component.find(Sign)).toHaveLength(1);
    expect(component.find(Sign).text()).toStrictEqual("+");
  });

  it("renders - sign next to the amount when currency is base", () => {
    const component = shallow(
      <Account
        base
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onChange={jest.fn()}
      />
    );

    expect(component.find(Sign)).toHaveLength(1);
    expect(component.find(Sign).text()).toStrictEqual("-");
  });

  it("does not render sign next to the amount when amount is empty", () => {
    const component = shallow(
      <Account amount="" ccy="EUR" totalAmount="120" onChange={jest.fn()} />
    );

    expect(component.find(Sign)).toHaveLength(0);
  });

  it("does not render exchange rate when exchangeRate prop is not provided", () => {
    const component = shallow(
      <Account
        base
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onChange={jest.fn()}
      />
    );

    expect(component.find(UnitExchangeRate)).toHaveLength(0);
  });

  it("renders exchange rate when exchangeRate prop is provided", () => {
    const exchangeRate = { baseCcy: "EUR", quoteCcy: "USD", rate: "1.5" };
    const component = shallow(
      <Account
        exchangeRate={exchangeRate}
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onChange={jest.fn()}
      />
    );

    expect(component.find(UnitExchangeRate)).toHaveLength(1);
    const props = component.find(UnitExchangeRate).props();
    expect(props.data).toStrictEqual(exchangeRate);
  });

  it("calls onChange when AmountInput changes", () => {
    const onChange = jest.fn();
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" onChange={onChange} />
    );

    const props = component.find(AmountInput).props();
    props.onChange("changed");

    expect(onChange).toBeCalledWith("changed");
  });

  it("focuses AmountInput inputRef when clicking on Account Wrapper", () => {
    const focus = jest.fn();
    jest.spyOn(React, "useRef").mockReturnValueOnce({ current: { focus } });

    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" onChange={jest.fn()} />
    );

    component.simulate("click");
    expect(focus).toBeCalled();
  });
});
