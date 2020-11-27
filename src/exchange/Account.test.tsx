import { shallow } from "enzyme";
import React from "react";
import { Account, Currency, Sign, TotalAmountWrapper } from "./Account";
import { AmountInput } from "./AmountInput";
import { Button } from "./Button";
import { TotalAmount } from "./TotalAmount";
import { UnitExchangeRate } from "./UnitExchangeRate";

describe("Account", () => {
  it("renders component", () => {
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
    );
    expect(component).toHaveLength(1);
  });

  it("renders AmountInput", () => {
    const onAmountChange = jest.fn();
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={onAmountChange}
        onAccountChange={jest.fn()}
      />
    );

    expect(component.find(AmountInput)).toHaveLength(1);
    const props = component.find(AmountInput).props();
    expect(props.value).toStrictEqual("10");
    expect(props.onChange).toStrictEqual(onAmountChange);
  });

  it("renders currency of the account", () => {
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
    );

    expect(component.find(Currency)).toHaveLength(1);
    expect(component.find(Currency).text()).toStrictEqual("EUR");
  });

  it("renders total amount of that currency account", () => {
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
    );

    expect(component.find(TotalAmount)).toHaveLength(1);
    const props = component.find(TotalAmount).props();
    expect(props.amount).toStrictEqual("120");
    expect(props.ccy).toStrictEqual("EUR");
    expect(component.find(TotalAmountWrapper).props().invalid).toBeUndefined();
  });

  it("renders total amount as invalid when invalid prop is provided", () => {
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
        invalid
      />
    );

    const props = component.find(TotalAmountWrapper).props();
    expect(props.invalid).toStrictEqual(true);
  });

  it("renders + sign next to the amount when currency is not base", () => {
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
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
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
    );

    expect(component.find(Sign)).toHaveLength(1);
    expect(component.find(Sign).text()).toStrictEqual("-");
  });

  it("does not render sign next to the amount when amount is empty", () => {
    const component = shallow(
      <Account
        amount=""
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
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
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
    );

    expect(component.find(UnitExchangeRate)).toHaveLength(0);
  });

  it("renders rounded exchange rate when exchangeRate prop is provided", () => {
    const exchangeRate = { baseCcy: "EUR", quoteCcy: "USD", rate: "1.5" };
    const component = shallow(
      <Account
        exchangeRate={exchangeRate}
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
    );

    expect(component.find(UnitExchangeRate)).toHaveLength(1);
    const props = component.find(UnitExchangeRate).props();
    expect(props.data).toStrictEqual(exchangeRate);
    expect(props.rounded).toStrictEqual(true);
  });

  it("calls onAmountChange when AmountInput changes", () => {
    const onAmountChange = jest.fn();
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={onAmountChange}
        onAccountChange={jest.fn()}
      />
    );

    const props = component.find(AmountInput).props();
    props.onChange("changed");

    expect(onAmountChange).toBeCalledWith("changed");
  });

  it("focuses AmountInput inputRef when clicking on Account Wrapper", () => {
    const focus = jest.fn();
    jest.spyOn(React, "useRef").mockReturnValueOnce({ current: { focus } });

    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={jest.fn()}
      />
    );

    component.simulate("click");
    expect(focus).toBeCalled();
  });

  it("calls onChangeAccount when clicking next button", () => {
    const onAccountChange = jest.fn();
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={onAccountChange}
      />
    );

    const nextButtonProps = component.find(Button).at(1).props();
    expect(nextButtonProps.children).toStrictEqual("〉");

    nextButtonProps.onClick!();

    expect(onAccountChange).toBeCalledWith(true);
  });

  it("calls onChangeAccount when clicking previous button", () => {
    const onAccountChange = jest.fn();
    const component = shallow(
      <Account
        amount="10"
        ccy="EUR"
        totalAmount="120"
        onAmountChange={jest.fn()}
        onAccountChange={onAccountChange}
      />
    );

    const prevButtonProps = component.find(Button).at(0).props();
    expect(prevButtonProps.children).toStrictEqual("〈");

    prevButtonProps.onClick!();

    expect(onAccountChange).toBeCalledWith();
  });
});
