import styledNormalize from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  // Colors
  main: "#ff6347",
  alt: "#bcb6ae",
  dark: "#353c44",
  medium: "#D9DCDD",
  light: "#D9DCDD",
  lighter: "#EFF3F4",
  background: "white",
  text: "#353c44",
  borderColor: "#ddd",

  // Dimensions
  borderRadius: 3,
  space: 1,
  maxWidth: 700
};

export const darkTheme = {
  // Colors
  main: "#ff6347",
  alt: "#aaa",
  dark: "#ddd",
  medium: "#ddd",
  light: "#ddd",
  lighter: "#EFF3F4",
  background: "#353c44",
  text: "#fff",
  borderColor: "#292d33",

  // Dimensions
  borderRadius: 3,
  space: 1,
  maxWidth: 700
};

export const GlobalStyles = createGlobalStyle<any>`
  ${styledNormalize}

  @import url('https://fonts.googleapis.com/css?family=Ubuntu');

  * { box-sizing: border-box; }

  html, input, textarea, select, button {
    font-family: 'Ubuntu', sans-serif;
    font-size: 100%;
    line-height: 1.5;
    color: ${props => props.theme.text};
  }

  html,
  body,
  #root {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.main};
  }

  h1, h2 {
    letter-spacing: -0.02em;
    margin: 0 0 .5em 0;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1rem;
  }
`;
