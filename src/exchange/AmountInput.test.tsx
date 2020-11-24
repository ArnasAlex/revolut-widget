import { shallow } from "enzyme";
import React from "react";
import { AmountInput, Input } from "./AmountInput";

describe("AmountInput", () => {
  const ref = {} as React.RefObject<HTMLInputElement>;

  it("renders component", () => {
    const component = shallow(
      <AmountInput inputRef={ref} onChange={jest.fn()} value="13" />
    );
    expect(component).toHaveLength(1);
  });

  it("renders input with value provided from props", () => {
    const component = shallow(
      <AmountInput inputRef={ref} onChange={jest.fn()} value="13" />
    );

    const input = component.find(Input);
    expect(input).toHaveLength(1);
    expect(input.props().value).toStrictEqual("13");
  });

  it("calls onChange when input changes", () => {
    const onChange = jest.fn();
    const component = shallow(
      <AmountInput inputRef={ref} onChange={onChange} value="13" />
    );

    const input = component.find(Input);
    input.props().onChange({ target: { value: "33" } });

    expect(onChange).toBeCalledWith("33");
  });

  it("updates input width when changing value", () => {
    let lastDeps = [] as React.DependencyList | undefined;
    jest.spyOn(React, "useEffect").mockImplementation((f, deps) => {
      if (!lastDeps || !deps || lastDeps[0] !== deps[0]) {
        lastDeps = deps;
        f();
      }
    });

    const useRefSpy = jest.spyOn(React, "useRef").mockReturnValue({
      current: { offsetWidth: "100" },
    });

    const component = shallow(
      <AmountInput inputRef={ref} onChange={jest.fn()} value="13" />
    );

    expect(component.find(Input).props().width).toStrictEqual("100");

    useRefSpy.mockReturnValue({
      current: { offsetWidth: "200" },
    });

    component.setProps({ value: "44432" });

    expect(component.find(Input).props().width).toStrictEqual("200");
  });
});
