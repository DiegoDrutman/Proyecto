import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'; 
import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // Styled-components theme provider
import { createTheme } from '@mui/material/styles'; 
import GlobalStyle from './styles/GlobalStyle'; // Import global styles
import { colors, fontSizes } from './styles/Variables'; // Import variables
import { BrowserRouter as Router } from 'react-router-dom';

// Define el tema de Material-UI
const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.light, // Usando variable de color
    },
    secondary: {
      main: colors.primary,
    },
    background: {
      default: colors.warmBackground,
      paper: '#FFFFFF',
    },
    text: {
      primary: colors.dark,
      secondary: colors.secondary,
    },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: fontSizes.large, // Usando variable de tamaño de fuente
    },
    h4: {
      fontSize: fontSizes.medium,
    },
    body1: {
      fontSize: fontSizes.small,
    },
  },
});

// Define un tema de styled-components que pueda compartir variables
const styledTheme = {
  colors,
  fontSizes,
};

// Renderiza la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledThemeProvider theme={styledTheme}>
      <GlobalStyle /> {/* Aplica los estilos globales aquí */}
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </MUIThemeProvider>
    </StyledThemeProvider>
  </React.StrictMode>
);
