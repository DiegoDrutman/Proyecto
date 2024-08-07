// src/styles/GlobalStyle.js

import { createGlobalStyle } from 'styled-components';
import { colors } from './Variables';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    background-color: ${colors.warmBackground};
    color: ${colors.dark};
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
