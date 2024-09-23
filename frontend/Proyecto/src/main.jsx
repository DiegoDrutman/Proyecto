import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'; 
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material/styles'; 
import GlobalStyle from './styles/GlobalStyle'; 
import { colors, fontSizes } from './styles/Variables'; 
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Importa tu estilo global si es necesario

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
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledThemeProvider theme={styledTheme}>
      <GlobalStyle />
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </MUIThemeProvider>
    </StyledThemeProvider>
  </StrictMode>
);
