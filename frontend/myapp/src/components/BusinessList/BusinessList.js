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
        const approvedBusinesses = data.filter(business => business.approved); // Filtra negocios aprobados
        setBusinesses(approvedBusinesses); // Actualiza el estado de negocios con solo los aprobados
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los negocios'); // Mostrar el mensaje de error de la API si está disponible
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
