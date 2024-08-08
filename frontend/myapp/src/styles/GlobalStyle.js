import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/wooden-table.webp'; // Asegúrate de que la ruta sea correcta
import { colors } from './Variables';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
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
