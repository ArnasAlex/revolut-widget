import { shallow } from "enzyme";
import React from "react";
import { Button, ButtonElement } from "./Button";

describe("Button", () => {
  it("renders component", () => {
    const component = shallow(<Button>Nice</Button>);
    expect(component).toHaveLength(1);
  });

  it("renders text inside", () => {
    const component = shallow(<Button>Nice</Button>);
    expect(component.text()).toStrictEqual("Nice");
  });

  it("renders enabled button when onClick is provided", () => {
    const component = shallow(<Button onClick={() => {}}>Nice</Button>);

    const button = component.find(ButtonElement);
    expect(button.props().disabled).toBeFalsy();
  });

  it("renders disabled button when onClick is not provided", () => {
    const component = shallow(<Button>Nice</Button>);

    const button = component.find(ButtonElement);
    expect(button.props().disabled).toBeTruthy();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const component = shallow(<Button onClick={onClick}>Nice</Button>);

    component.simulate("click");

    expect(onClick).toBeCalled();
  });
});
