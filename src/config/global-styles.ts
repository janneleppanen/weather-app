import styledNormalize from "styled-normalize";
import { injectGlobal } from "styled-components";

export const theme = {
  // Colors
  main: "#FF6D3D",
  secondary: "#2E4057",
  background: "white",
  text: "#2E4057",

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
    color: #2E4057;
  }

  html,
  body,
  #root {
    height: 100%;
  }
`;
