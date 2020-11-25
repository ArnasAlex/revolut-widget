import { createGlobalStyle } from "styled-components";

export const color = {
  white: "#FFF",
  whiteTransparent: "rgba(255, 255, 255, 0.7)",
  blue: "#225DCC",
  blueLight: "#2976ff",
  transparent: "transparent",
};

export const fontSize = {
  big: "36",
  base: '16',
  small: "14",
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }
`;
