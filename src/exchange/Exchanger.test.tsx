import { shallow } from "enzyme";
import React from "react";
import { AppState, initialState } from "../AppContext";
import * as api from "../utils/api";
import { Account } from "./Account";
import { Button } from "./Button";
import { Exchanger } from "./Exchanger";
import { UnitExchangeRate } from "./UnitExchangeRate";

describe("Exchanger", () => {
  function mockAppContext(state: Partial<AppState> = {}) {
    const dispatch = jest.fn();
    jest.spyOn(React, "useContext").mockReturnValue({
      state: { ...initialState(), ...state },
      dispatch,
    });

    return { dispatch };
  }

  function flushPromises() {
    return new Promise((resolve) => setImmediate(resolve));
  }

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("renders component", () => {
    const component = shallow(<Exchanger />);
    expect(component).toHaveLength(1);
  });

  it("renders base ccy Account component", () => {
    mockAppContext({ baseAmount: "20" });
    const component = shallow(<Exchanger />);

    const baseProps = component.find(Account).at(0).props();
    expect(baseProps.base).toStrictEqual(true);
    expect(baseProps.amount).toStrictEqual("20");
    expect(baseProps.totalAmount).toStrictEqual("100");
    expect(baseProps.ccy).toStrictEqual("EUR");
    expect(baseProps.exchangeRate).toBeUndefined();
    expect(baseProps.invalid).toStrictEqual(false);
  });

  it("renders base ccy Account component as invalid when total amount is smaller than amount inputed", () => {
    mockAppContext({ baseAmount: "9000" });
    const component = shallow(<Exchanger />);

    const baseProps = component.find(Account).at(0).props();
    expect(baseProps.invalid).toStrictEqual(true);
  });

  it("renders quote ccy Account component", () => {
    mockAppContext({ quoteAmount: "17", rate: "2" });
    const component = shallow(<Exchanger />);

    const quoteProps = component.find(Account).at(1).props();
    expect(quoteProps.base).toBeUndefined();
    expect(quoteProps.amount).toStrictEqual("17");
    expect(quoteProps.totalAmount).toStrictEqual("200");
    expect(quoteProps.ccy).toStrictEqual("USD");
    expect(quoteProps.exchangeRate).toStrictEqual({
      baseCcy: "EUR",
      quoteCcy: "USD",
      rate: "0.5",
    });
  });

  it("renders UnitExchangeRate component", () => {
    mockAppContext({ rate: "1.242144" });
    const component = shallow(<Exchanger />);

    const rateProps = component.find(UnitExchangeRate).props();
    expect(rateProps.data).toStrictEqual({
      baseCcy: "USD",
      quoteCcy: "EUR",
      rate: "1.2421",
    });

    expect(rateProps.rounded).toBeUndefined();
  });

  it("dispatches BaseAmountChanged action when base Account onAmountChange is called", async () => {
    const { dispatch } = mockAppContext();
    const component = shallow(<Exchanger />);
    const props = component.find(Account).at(0).props();

    props.onAmountChange("10");

    expect(dispatch).toBeCalledWith({
      type: "BaseAmountChanged",
      payload: {
        amount: "10",
      },
    });
  });

  it("dispatches BaseAmountChanged action when quote Account onAmountChange is called", async () => {
    const { dispatch } = mockAppContext();
    const component = shallow(<Exchanger />);
    const props = component.find(Account).at(1).props();

    props.onAmountChange("55");

    expect(dispatch).toBeCalledWith({
      type: "QuoteAmountChanged",
      payload: {
        amount: "55",
      },
    });
  });

  it("renders Exchange button with no onClick handler when base amount is empty", async () => {
    mockAppContext({ baseAmount: "" });
    const component = shallow(<Exchanger />);

    const props = component.find(Button).at(1).props();
    expect(props.children).toStrictEqual("Exchange");
    expect(props.onClick).toBeUndefined();
  });

  it("renders Exchange button with no onClick handler when base ccy total amount is smaller than amount input", async () => {
    mockAppContext({ baseAmount: "50000" });
    const component = shallow(<Exchanger />);

    const props = component.find(Button).at(1).props();
    expect(props.children).toStrictEqual("Exchange");
    expect(props.onClick).toBeUndefined();
  });

  it("dispatches Exchange action when Exchange button is clicked", async () => {
    const { dispatch } = mockAppContext({ baseAmount: "10" });
    const component = shallow(<Exchanger />);

    const props = component.find(Button).at(1).props();
    expect(typeof props.onClick).toStrictEqual("function");
    props.onClick!();

    expect(dispatch).toBeCalledWith({
      type: "Exchange",
      payload: {},
    });
  });

  it("renders Cancel button that does nothing", async () => {
    const component = shallow(<Exchanger />);

    const cancelButton = component.find(Button).at(0);
    expect(cancelButton.props().children).toStrictEqual("Cancel");
  });

  it("dispatches BaseAccountChanged when base Account onChangeAccount is called", async () => {
    const { dispatch } = mockAppContext();
    const component = shallow(<Exchanger />);
    const baseAccountProps = () => component.find(Account).at(0).props();

    baseAccountProps().onAccountChange();

    expect(dispatch).toBeCalledWith({
      type: "BaseAccountChanged",
      payload: { next: undefined },
    });
  });

  it("dispatches QuoteAccountChanged when quote Account onChangeAccount is called", async () => {
    const { dispatch } = mockAppContext();
    const component = shallow(<Exchanger />);
    const quoteAccountProps = () => component.find(Account).at(1).props();

    quoteAccountProps().onAccountChange(true);

    expect(dispatch).toBeCalledWith({
      type: "QuoteAccountChanged",
      payload: { next: true },
    });
  });

  it("dispatches RateChanged with rate '1' when same currency is selected for base and quote accounts", () => {
    const { dispatch } = mockAppContext({
      baseAccountIdx: 0,
      quoteAccountIdx: 0,
    });

    let lastDeps = [] as React.DependencyList | undefined;
    jest.spyOn(React, "useEffect").mockImplementation((f, deps) => {
      if (!lastDeps || !deps || lastDeps[0] !== deps[0]) {
        lastDeps = deps;
        f();
      }
    });

    shallow(<Exchanger />);

    expect(dispatch).toBeCalledWith({
      type: "RateChanged",
      payload: { rate: "1" },
    });
  });

  it("does not get exchange rate when base and quote ccy is the same", () => {
    mockAppContext({
      baseAccountIdx: 0,
      quoteAccountIdx: 0,
    });

    let lastDeps = [] as React.DependencyList | undefined;
    jest.spyOn(React, "useEffect").mockImplementation((f, deps) => {
      if (!lastDeps || !deps || lastDeps[0] !== deps[0]) {
        lastDeps = deps;
        f();
      }
    });

    const getCcyRate = jest.spyOn(api, "getCcyRate").mockImplementation();

    shallow(<Exchanger />);

    expect(getCcyRate).not.toBeCalled();
  });

  it("dispatches RateChanged after fetching when quote ccy is not the same", async () => {
    const { dispatch } = mockAppContext({
      baseAccountIdx: 0,
      quoteAccountIdx: 1,
    });

    let lastDeps = [] as React.DependencyList | undefined;
    jest.spyOn(React, "useEffect").mockImplementation((f, deps) => {
      if (!lastDeps || !deps || lastDeps[0] !== deps[0]) {
        lastDeps = deps;
        f();
      }
    });

    const getCcyRate = jest.spyOn(api, "getCcyRate").mockResolvedValue("1.5");

    shallow(<Exchanger />);

    await flushPromises();

    expect(getCcyRate).toBeCalledWith("EUR", "USD");
    expect(dispatch).toBeCalledWith({
      type: "RateChanged",
      payload: { rate: "1.5" },
    });
  });

  it("dispatches RateChanged every 10 seconds with value from getCcyRate", async () => {
    jest.useFakeTimers();

    const { dispatch } = mockAppContext({
      baseAccountIdx: 0,
      quoteAccountIdx: 1,
    });

    let lastDeps = [] as React.DependencyList | undefined;
    jest.spyOn(React, "useEffect").mockImplementation((f, deps) => {
      if (!lastDeps || !deps || lastDeps[0] !== deps[0]) {
        lastDeps = deps;
        f();
      }
    });

    let getCcyCalls = 0;
    jest.spyOn(api, "getCcyRate").mockImplementation(() => {
      getCcyCalls += 1;
      return Promise.resolve(getCcyCalls.toString());
    });

    shallow(<Exchanger />);

    const setTimeout = jest.spyOn(window, "setTimeout");

    await flushPromises();

    expect(setTimeout).toBeCalledWith(expect.any(Function), 10000);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).lastCalledWith({
      type: "RateChanged",
      payload: { rate: "1" },
    });

    jest.runOnlyPendingTimers();
    await flushPromises();

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).lastCalledWith({
      type: "RateChanged",
      payload: { rate: "2" },
    });

    jest.runOnlyPendingTimers();
    await flushPromises();

    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch).lastCalledWith({
      type: "RateChanged",
      payload: { rate: "3" },
    });
  });
});
