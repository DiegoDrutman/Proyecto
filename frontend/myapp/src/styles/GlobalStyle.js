import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/new-background.jpg'; // Asegúrate de que la ruta sea correcta
import { colors, fontSizes } from './Variables';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif !important;
    background: linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ),
    url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    color: ${colors.dark} !important;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif !important;
  }

  h1 {
    font-family: 'Dancing Script', cursive !important;
    font-size: ${fontSizes.large} !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
