// src/pages/BusinessList/BusinessList.js
import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import { getBusinesses } from '../../services/api'; // Importa correctamente desde api.js
import BusinessCard from '../BusinessCard/BusinessCard'; // Importa el componente correctamente
import { BusinessGridContainer, NoBusinessesMessage } from './BusinessList.styles'; // Importa los estilos desde el archivo correcto

const BusinessList = ({ searchTerm }) => {
  const [businesses, setBusinesses] = useState([]); // Estado para negocios
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getBusinesses(searchTerm); // Llama a la API con el término de búsqueda
        setBusinesses(data); // Actualiza el estado de negocios
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los negocios');
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [searchTerm]); // Añade searchTerm como dependencia para la búsqueda dinámica

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <BusinessGridContainer>
      {businesses.length > 0 ? (
        businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))
      ) : (
        <NoBusinessesMessage variant="h6">
          No se encontraron negocios.
        </NoBusinessesMessage>
      )}
    </BusinessGridContainer>
  );
};

export default BusinessList;
