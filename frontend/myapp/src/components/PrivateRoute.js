import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente que gestiona el acceso a rutas protegidas.
 * Solo permite el acceso si el usuario está autenticado.
 * 
 * @param {boolean} isAuthenticated - Indica si el usuario está autenticado.
 * @returns {JSX.Element} - Un componente Outlet que renderiza los hijos si el usuario está autenticado, 
 *                          o redirige a la página de inicio de sesión si no lo está.
 */
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
