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
  headerBackground: "whitesmoke",
  text: "#353c44",
  borderColor: "#ddd",
  headerBorder: "1px solid #ccc",

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
  headerBackground: "#333",
  text: "#fff",
  borderColor: "#292d33",
  headerBorder: "1px solid tomato",

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

  .screen-reader-text,
  a.skip-main {
    left:-999px;
    position:absolute;
    top:auto;
    width:1px;
    height:1px;
    overflow:hidden;
    z-index:-999;
  }
  a.skip-main:focus, a.skip-main:active {
    color: #fff;
    background-color:#000;
    left: auto;
    top: auto;
    width: 30%;
    height: auto;
    overflow:auto;
    margin: 10px 35%;
    padding:5px;
    border-radius: 15px;
    border:4px solid yellow;
    text-align:center;
    font-size:1.2em;
    z-index:999;
  }
`;
