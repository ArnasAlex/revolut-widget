import { shallow } from "enzyme";
import React from "react";
import { Account, Amount, Currency, Sign } from "./Account";
import { TotalAmount } from "./TotalAmount";
import { UnitExchangeRate } from "./UnitExchangeRate";

describe("Account", () => {
  it("renders component", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" />
    );
    expect(component).toHaveLength(1);
  });

  it("renders amount to be traded", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" />
    );

    expect(component.find(Amount)).toHaveLength(1);
    expect(component.find(Amount).text()).toStrictEqual("10");
  });

  it("renders currency of the account", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" />
    );

    expect(component.find(Currency)).toHaveLength(1);
    expect(component.find(Currency).text()).toStrictEqual("EUR");
  });

  it("renders total amount of that currency account", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" />
    );

    expect(component.find(TotalAmount)).toHaveLength(1);
    const props = component.find(TotalAmount).props();
    expect(props.amount).toStrictEqual("120");
    expect(props.ccy).toStrictEqual("EUR");
  });

  it("renders + sign next to the amount when currency is not base", () => {
    const component = shallow(
      <Account amount="10" ccy="EUR" totalAmount="120" />
    );

    expect(component.find(Sign)).toHaveLength(1);
    expect(component.find(Sign).text()).toStrictEqual("+");
  });

  it("renders - sign next to the amount when currency is base", () => {
    const component = shallow(
      <Account base amount="10" ccy="EUR" totalAmount="120" />
    );

    expect(component.find(Sign)).toHaveLength(1);
    expect(component.find(Sign).text()).toStrictEqual("-");
  });

  it("does not render exchange rate when exchangeRate prop is not provided", () => {
    const component = shallow(
      <Account base amount="10" ccy="EUR" totalAmount="120" />
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
      />
    );

    expect(component.find(UnitExchangeRate)).toHaveLength(1);
    const props = component.find(UnitExchangeRate).props();
    expect(props.data).toStrictEqual(exchangeRate);
  });
});
