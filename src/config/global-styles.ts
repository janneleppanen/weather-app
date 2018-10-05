import styledNormalize from "styled-normalize";
import { injectGlobal } from "styled-components";

export const theme = {
  // Colors
  main: "#f48230",
  alt: "#bcb6ae",
  dark: "#353c44",
  light: "#FCFAF7",
  background: "white",
  text: "#353c44",

  // Dimensions
  space: "1rem",
  maxWidth: "1000px"
};

injectGlobal`
  ${styledNormalize}

  @import url('https://fonts.googleapis.com/css?family=Ubuntu');

  html {
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
