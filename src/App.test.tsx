import { shallow } from "enzyme";
import React from "react";
import { App } from "./App";
import { Exchanger } from "./exchange";
import {GlobalStyles} from './styles';

describe("App", () => {
  it("renders App component", () => {
    const app = shallow(<App />);
    expect(app).toHaveLength(1);
  });

  it("renders Exchanger", () => {
    const app = shallow(<App />);
    expect(app.find(Exchanger)).toHaveLength(1);
  });

  it("renders GlobalStyles", () => {
    const app = shallow(<App />);
    expect(app.find(GlobalStyles)).toHaveLength(1);
  });
});
