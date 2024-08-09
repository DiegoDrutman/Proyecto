import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/wooden-table.webp'; // Asegúrate de que la ruta sea correcta
import { colors } from './Variables';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif; /* Fuente base para todo el cuerpo */
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    color: ${colors.dark};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif; /* Elegante para todos los encabezados */
  }

  h1 {
    font-family: 'Dancing Script', cursive; /* Mantén un estilo especial para el h1 */
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
