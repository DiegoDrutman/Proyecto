import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

export const BusinessWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 80px auto; /* Aumentado el margen superior e inferior */
  padding: ${spacing.large};
  flex-wrap: wrap;
  background-color: ${colors.light};
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 40px auto; /* Aumentado el margen superior e inferior en pantallas pequeñas */
    padding: ${spacing.medium};
  }
`;

export const InfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: ${spacing.large};

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${spacing.large};
  }
`;

export const DetailsContainer = styled(Box)`
  background-color: ${colors.light};
  padding: ${spacing.large};
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  margin-bottom: ${spacing.large};
`;

export const AddressContainer = styled(Box)`
  background-color: ${colors.light};
  padding: ${spacing.large};
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.large};
  border-radius: 20px;
  margin: 80px auto; /* Aumentado el margen superior e inferior */
  max-width: 1200px;
  position: relative;
  background-size: cover;
  background-position: center;
  color: ${colors.light};
  height: 350px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${spacing.medium};
    margin: 40px auto; /* Aumentado el margen superior e inferior en pantallas pequeñas */
  }
`;

export const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
`;

export const TextContainer = styled(Box)`
  z-index: 1;
  text-align: center;
  color: ${colors.light};
  padding: ${spacing.medium};

  @media (max-width: 768px) {
    padding: ${spacing.small};
  }
`;

export const BusinessImage = styled(Box)`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const BusinessTitle = styled(Typography)`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.light};
  margin-bottom: ${spacing.large};
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const SectionTitle = styled(Typography)`
  margin-bottom: ${spacing.large};
  font-weight: bold;
  color: ${colors.primary};
  text-transform: uppercase;
  font-size: 1.2rem;
`;

export const ProductList = styled(Box)`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spacing.large} 0;
  background-color: ${colors.light};
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-left: ${spacing.large}; 

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: ${spacing.large};
  }
`;

export const ProductItem = styled(Box)`
  width: 300px;
  margin: ${spacing.large};
  text-align: center;
  background-color: ${colors.light};
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  padding: ${spacing.large};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    margin-bottom: ${spacing.medium};
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  h6 {
    margin-top: ${spacing.small};
    color: ${colors.primary};
    font-size: 1.2rem;
  }

  p {
    margin-top: ${spacing.xsmall};
    color: ${colors.dark};
  }
`;
