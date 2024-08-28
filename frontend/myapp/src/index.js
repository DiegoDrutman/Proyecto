import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'; 
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material/styles'; 
import GlobalStyle from './styles/GlobalStyle'; 
import { colors, fontSizes } from './styles/Variables'; 
import { BrowserRouter as Router } from 'react-router-dom';

// Define el tema de Material-UI
const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.dark,
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
      fontSize: fontSizes.large,
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
      <GlobalStyle /> 
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </MUIThemeProvider>
    </StyledThemeProvider>
  </React.StrictMode>
);
