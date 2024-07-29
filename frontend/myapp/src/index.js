// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import './index.css';   

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF', // Color primario más representativo
        },
        secondary: {
            main: '#FFFFFF', // Un color secundario complementario y vibrante
        },
        background: {
            default: '#FFFFFF' // Asegura coherencia en el fondo
        }
    },
    typography: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif', // Confirmar la fuente aquí para coherencia
        h1: {
            fontSize: '2.4rem', // Ajustado para mejor legibilidad
        },
        h4: {
            fontSize: '1.6rem',
        },
        body1: {
            fontSize: '1.1rem', // Ligeramente más grande para mejorar la legibilidad
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
