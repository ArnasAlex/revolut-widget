import { shallow } from "enzyme";
import React from "react";
import { ExchangeRate } from "../types";
import { UnitExchangeRate } from "./UnitExchangeRate";

describe("UnitExchangeRate", () => {
  const rateData: ExchangeRate = {
    baseCcy: "EUR",
    quoteCcy: "GBP",
    rate: "0.8",
  };

  it("renders component", () => {
    const component = shallow(<UnitExchangeRate data={rateData} />);
    expect(component).toHaveLength(1);
  });

  it("renders text correctly", () => {
    const component = shallow(<UnitExchangeRate data={rateData} />);
    expect(component.text()).toStrictEqual("£1 = €0.8");
  });

  it("renders '...' when rate is 0 when rate is not loaded", () => {
    const component = shallow(
      <UnitExchangeRate data={{ ...rateData, rate: "0" }} />
    );

    expect(component.text()).toStrictEqual("...");
  });

  it("renders '...' when rate is Infinity when rate is not loaded", () => {
    const component = shallow(
      <UnitExchangeRate data={{ ...rateData, rate: "Infinity" }} />
    );

    expect(component.text()).toStrictEqual("...");
  });

  it("shows only two decimal places when rounded is true", () => {
    const component = shallow(
      <UnitExchangeRate data={{ ...rateData, rate: "0.8232111" }} rounded />
    );
    expect(component.text()).toStrictEqual("£1 = €0.82");
  });

  it("shows all decimal places when rounded is undefined", () => {
    const component = shallow(
      <UnitExchangeRate data={{ ...rateData, rate: "0.8232111" }} />
    );
    expect(component.text()).toStrictEqual("£1 = €0.8232111");
  });
});
