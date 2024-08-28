import { Box, Container, Button, TextField } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { colors, fontSizes } from '../styles/Variables';
import backgroundImage from '../assets/new-background.jpg'; // Asegúrate de que la ruta sea correcta

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FullScreenContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${backgroundImage}) no-repeat center center;
  color: ${colors.light};
  background-size: cover;
  background-attachment: fixed;
`;

export const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  padding: 40px;
  animation: ${fadeIn} 0.5s ease-in-out;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin-top: -100px;
`;

export const StyledAutocomplete = styled(TextField)`
  width: 100%;
  margin: 20px auto;
  
  .MuiOutlinedInput-root {
    background-color: ${colors.light};
    border-radius: 12px;
    height: 60px;
    font-size: 18px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    }
  }

  .MuiInputLabel-outlined {
    font-size: 16px;
    color: ${colors.secondary};
  }
`;

export const HeaderTypography = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: ${colors.dark};
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: ${fontSizes.xlarge};
  }
`;

export const SubHeaderTypography = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: ${colors.secondary};
  margin-bottom: 30px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.medium};
  }
`;

export const BusinessesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 10px;
  margin: 20px 0;
  background-color: transparent;
`;

export const BusinessGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 10px;
`;

export const LocationButtonPrimary = styled(Button)`
  margin: 10px;
  padding: 20px;
  width: 100%;
`;

export const LocationButtonSecondary = styled(Button)`
  margin: 10px;
  padding: 20px;
  width: 100%;
`;
