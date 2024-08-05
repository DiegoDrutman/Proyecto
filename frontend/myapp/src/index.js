import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material'; 
import { createTheme } from '@mui/material/styles'; 
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFF8E1',
    },
    secondary: {
      main: '#8B4513',
    },
    background: {
      default: '#D2B48C',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#8B4513',
      secondary: '#8B4513',
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
