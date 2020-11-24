import { shallow } from "enzyme";
import React from "react";
import App from "./App";

describe("App", () => {
  it("renders component", () => {
    const app = shallow(<App />);
    expect(app.text()).toStrictEqual("Welcome");
  });
});
