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
  TextContainer,
  BusinessTitle,
  ProductList, 
  ProductItem,
  Overlay,
} from './BusinessDetails.styles';
import defaultBusinessImage from '../../assets/default-image.jpg';
import defaultProductImage from '../../assets/default-product.jpg';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await getBusinessById(id);
        console.log('Datos del negocio:', data); // Log para verificar los datos
        if (data && Object.keys(data).length > 0) {
          setBusiness(data);
        } else {
          setError('No se encontraron datos para este negocio.');
        }
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
      <HeaderContainer style={{ backgroundImage: `url(${business.logo || defaultBusinessImage})` }}>
        <Overlay />
        <TextContainer>
          <BusinessTitle>{business.name || "Nombre no disponible"}</BusinessTitle>
          <Typography variant="body1">{business.description || "No hay descripción disponible."}</Typography>
        </TextContainer>
      </HeaderContainer>
      
      <BusinessWrapper>
        <InfoContainer>
          <DetailsContainer>
            <SectionTitle>Detalles</SectionTitle>
            <Typography variant="body1">
              <strong>Horario:</strong> {business.opening_hours || "N/A"} - {business.closing_hours || "N/A"}
            </Typography>
          </DetailsContainer>

          <AddressContainer>
            <SectionTitle>Dirección</SectionTitle>
            <Typography variant="body1">
              {business.address || "No hay dirección disponible."}
            </Typography>
          </AddressContainer>
        </InfoContainer>

        {business.products && business.products.length > 0 ? (
          <ProductList>
            <SectionTitle>Productos</SectionTitle>
            {business.products.map((product) => (
              <ProductItem key={product.id}>
                <img src={product.image || defaultProductImage} alt={product.name || "Producto sin nombre"} />
                <Typography variant="h6">{product.name || "Producto sin nombre"}</Typography>
                <Typography variant="body1">{product.description || 'Sin descripción'}</Typography>
                <Typography variant="body2">${product.price != null ? product.price : 'Precio no disponible'}</Typography>
              </ProductItem>
            ))}
          </ProductList>
        ) : (
          <Typography variant="body1">No hay productos disponibles.</Typography>
        )}
      </BusinessWrapper>
    </>
  );
};

export default BusinessDetails;
