import styledNormalize from "styled-normalize";
import { injectGlobal } from "styled-components";

export const theme = {
  // Colors
  main: "#ff6347",
  alt: "#bcb6ae",
  dark: "#353c44",
  medium: "#D9DCDD",
  light: "#D9DCDD",
  lighter: "#EFF3F4",
  background: "white",
  text: "#353c44",

  // Dimensions
  space: "1rem",
  maxWidth: "1000px"
};

injectGlobal`
  ${styledNormalize}

  @import url('https://fonts.googleapis.com/css?family=Ubuntu');

  * { box-sizing: border-box; }

  html, input, textarea, select, button {
    font-family: 'Ubuntu', sans-serif;
    font-size: 100%;
    line-height: 1.5;
    color: #353c44;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: #353c44
  }
`;
