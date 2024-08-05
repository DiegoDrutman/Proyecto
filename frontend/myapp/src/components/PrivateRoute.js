import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente para proteger rutas privadas.
 *
 * @param {boolean} isAuthenticated
 * @param {React.Component} children
 * @returns {JSX.Element}
 */

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
