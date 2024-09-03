import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import { getBusinesses } from '../../services/api';
import BusinessCard from '../BusinessCard/BusinessCard';
import { BusinessGridContainer, NoBusinessesMessage } from './BusinessList.styles';

const BusinessList = ({ searchTerm }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getBusinesses(searchTerm);
        console.log('Businesses Data:', data); // Depuración

        const approvedBusinesses = data.filter(business => business.approved);
        console.log('Approved Businesses:', approvedBusinesses); // Verifica los negocios aprobados

        // Verificar el campo logo en cada business
        approvedBusinesses.forEach(business => {
          if (!business.logo) {
            console.warn(`El negocio con ID ${business.id} no tiene un logo definido.`);
          }
        });

        setBusinesses(approvedBusinesses);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los negocios');
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [searchTerm]);

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
