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
    expect(component.text()).toStrictEqual("€1 = £0.8");
  });
});
