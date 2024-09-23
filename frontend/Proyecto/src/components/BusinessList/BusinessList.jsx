import { useState, useEffect } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import { getBusinesses } from '../../services/api';
import BusinessCard from '../BusinessCard/BusinessCard';
import { BusinessGridContainer, NoBusinessesMessage } from './BusinessList.styles';
import PropTypes from 'prop-types';  // Importación de PropTypes

const BusinessList = ({ searchTerm }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getBusinesses(searchTerm);
        console.log('Businesses Data:', data);

        const approvedBusinesses = data.filter(business => business.approved);
        console.log('Approved Businesses:', approvedBusinesses);

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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <BusinessGridContainer>
      {businesses.length > 0 ? (
        businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))
      ) : (
        <NoBusinessesMessage variant="h6">
          {searchTerm ? `No se encontraron negocios que coincidan con "${searchTerm}".` : 'No se encontraron negocios.'}
        </NoBusinessesMessage>
      )}
    </BusinessGridContainer>
  );
};

// Añadiendo PropTypes para validar las propiedades
BusinessList.propTypes = {
  searchTerm: PropTypes.string,  // Validación de searchTerm
};

export default BusinessList;
