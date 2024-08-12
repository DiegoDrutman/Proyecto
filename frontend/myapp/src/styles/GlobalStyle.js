import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/wooden-table.webp'; // Asegúrate de que la ruta sea correcta
import { colors, fontSizes } from './Variables';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif !important; /* Fuente base para todo el cuerpo */
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    color: ${colors.dark} !important;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif !important; /* Elegante para todos los encabezados */
  }

  h1 {
    font-family: 'Dancing Script', cursive !important; /* Mantén un estilo especial para el h1 */
    font-size: ${fontSizes.large} !important; /* Asegurar que se aplique el tamaño */
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
