import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/new-background.jpg'; // Asegúrate de que la ruta sea correcta
import { colors, fontSizes, spacing } from './Variables';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    background: linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ),
    url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    color: ${colors.textDark};
    overflow-x: hidden;  // Evitar el scroll horizontal
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif !important;
    color: ${colors.primaryText} !important;
  }

  h1 {
    font-size: ${fontSizes.large} !important;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: ${colors.linkText} !important;
  }

  button {
    background-color: ${colors.buttonBackground};
    color: ${colors.buttonText};
    border: none;
    padding: ${spacing.medium};
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colors.buttonHoverBackground};
      color: ${colors.buttonHoverText};
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
