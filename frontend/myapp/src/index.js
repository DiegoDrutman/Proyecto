import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DAA520',
    },
    secondary: {
      main: '#A67C00',
    },
    background: {
      default: '#FFF8DC',
      paper: '#FFFAF0',
    },
    text: {
      primary: '#654321',
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.4rem',
    },
    h4: {
      fontSize: '1.6rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();