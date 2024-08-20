import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Alert } from '@mui/material';
import { getBusinessById } from '../../services/api';
import {
  BusinessWrapper,
  InfoContainer,
  DetailsContainer,
  AddressContainer,
  SectionTitle,
  HeaderContainer,
  BusinessImage,
  TextContainer,
  BusinessTitle,
  ProductList, 
  ProductItem,
} from './BusinessDetails.styles';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await getBusinessById(id);
        setBusiness(data);
      } catch (error) {
        setError('Error al cargar los detalles del negocio.');
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!business) return <Typography>No se encontró el negocio.</Typography>;

  return (
    <>
      <HeaderContainer>
        <TextContainer>
          <BusinessTitle>{business.name}</BusinessTitle>
          <Typography variant="body1">{business.description}</Typography>
        </TextContainer>
        <BusinessImage component="img" src={business.image} alt={business.name} />
      </HeaderContainer>
      
      <BusinessWrapper>
        <InfoContainer>
          <DetailsContainer>
            <SectionTitle>Detalles</SectionTitle>
            <Typography variant="body1">
              <strong>Horario:</strong> {business.operating_hours}
            </Typography>
          </DetailsContainer>

          <AddressContainer>
            <SectionTitle>Dirección</SectionTitle>
            <Typography variant="body1">
              {business.address}
            </Typography>
          </AddressContainer>
        </InfoContainer>

        {business.products && business.products.length > 0 && (
          <ProductList>
            <SectionTitle>Productos</SectionTitle>
            {business.products.map((product) => (
              <ProductItem key={product.id}>
                <img src={product.image} alt={product.name} />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </ProductItem>
            ))}
          </ProductList>
        )}
      </BusinessWrapper>
    </>
  );
};

export default BusinessDetails;
