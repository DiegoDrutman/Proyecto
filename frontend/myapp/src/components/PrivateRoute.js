import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente para proteger rutas privadas.
 *
 * @param {boolean} isAuthenticated - Estado de autenticación del usuario.
 * @param {React.Component} children - Componente a renderizar si está autenticado.
 * @returns {JSX.Element} - Componente protegido o redirección.
 */
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
