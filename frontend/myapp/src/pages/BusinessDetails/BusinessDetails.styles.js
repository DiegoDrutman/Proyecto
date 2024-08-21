import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

export const BusinessWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 40px auto;
  padding: ${spacing.medium};
  flex-wrap: wrap;
  background-color: ${colors.light};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px auto;
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
  padding: ${spacing.medium};
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: ${spacing.large};
`;

export const AddressContainer = styled(Box)`
  background-color: ${colors.light};
  padding: ${spacing.medium};
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.large};
  border-radius: 12px;
  margin: 20px auto;
  max-width: 1200px;
  position: relative;
  background-size: cover;
  background-position: center;
  color: ${colors.light};
  height: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
`;

export const TextContainer = styled(Box)`
  z-index: 1;
  text-align: center;
  color: ${colors.light};
`;

export const BusinessImage = styled(Box)`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const BusinessTitle = styled(Typography)`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.light};
  margin-bottom: ${spacing.medium};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SectionTitle = styled(Typography)`
  margin-bottom: ${spacing.medium};
  font-weight: bold;
  color: ${colors.primary};
  text-transform: uppercase;
`;

export const ProductList = styled(Box)`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: ${spacing.large} 0;
  background-color: ${colors.light};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-left: ${spacing.large}; 

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: ${spacing.large};
  }
`;

export const ProductItem = styled(Box)`
  width: 280px;
  margin: ${spacing.medium};
  text-align: center;
  background-color: ${colors.light};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: ${spacing.medium};

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: ${spacing.small};
  }

  h6 {
    margin-top: ${spacing.small};
    color: ${colors.primary};
  }

  p {
    margin-top: ${spacing.xsmall};
    color: ${colors.dark};
  }
`;
