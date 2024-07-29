import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import documentManagementIcon from '../assets/document_management_icon.webp';
import collaborateIcon from '../assets/collaboration_icon.webp';
import organizeIcon from '../assets/stay_organized_icon.webp';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Colores modernos y tipografía estilizada
const colors = {
  primary: '#003366',
  secondary: '#0077CC',
  light: '#f0f8ff',
  dark: '#012840',
  accent: '#8A735B',
  warmBackground: '#fff',
};

// Crear un estilo global para aplicar las fuentes a toda la aplicación
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', 'Open Sans', sans-serif;
  }
`;

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${colors.warmBackground};
  color: ${colors.dark};
  text-align: center;
`;

const ContentWrapper = styled(Box)`
  display: grid;
  gap: 10px;
  justify-items: center;
  max-width: 1700px;
  width: 100%;
  padding: 40px 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FeatureGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  width: 100%;
  justify-items: center;
`;

const FeaturePaper = styled(Box)`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  color: #333;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTypography = styled(Typography)`
  font-family: 'Roboto', 'Open Sans', sans-serif;
`;

const HomePage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <GlobalStyle />
      <FullScreenContainer>
        <ContentWrapper>
          <StyledTypography
            variant="h2"
            fontSize={70}
            color={colors.secondary}
            sx={{ marginBottom: 1 }}
          >
            TaskWave
          </StyledTypography>
          <StyledTypography
            variant="h3"
            fontSize={45}
            fontStyle="italic"
            sx={{ marginBottom: 2 }}
          >
            Gestiona tus documentos de manera eficiente
          </StyledTypography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick('/login')}
            sx={{ mt: 2, mb: 4, px: 4, py: 2, fontSize: '1.2rem' }}
          >
            Sube tu Documento
          </Button>
          <FeatureGrid>
            <FeaturePaper>
              <img src={documentManagementIcon} alt="Document Management" style={{ width: '100px', height: '100px' }} />
              <StyledTypography variant="h4" gutterBottom color={colors.primary}>
                Gestión de Documentos
              </StyledTypography>
              <StyledTypography variant="body1">
                Organiza y accede a tus documentos en un solo lugar.
              </StyledTypography>
            </FeaturePaper>

            <FeaturePaper>
              <img src={collaborateIcon} alt="Collaborate Effectively" style={{ width: '100px', height: '100px' }} />
              <StyledTypography variant="h4" gutterBottom color={colors.primary}>
                Colaboración en Tiempo Real
              </StyledTypography>
              <StyledTypography variant="body1">
                Colabora y recibe feedback instantáneo de tu equipo o clientes.
              </StyledTypography>
            </FeaturePaper>

            <FeaturePaper>
              <img src={organizeIcon} alt="Stay Organized" style={{ width: '100px', height: '100px' }} />
              <StyledTypography variant="h4" gutterBottom color={colors.primary}>
                Organización Efectiva
              </StyledTypography>
              <StyledTypography variant="body1">
                Mantén todos tus documentos ordenados y fácilmente accesibles.
              </StyledTypography>
            </FeaturePaper>
          </FeatureGrid>
        </ContentWrapper>
      </FullScreenContainer>
    </>
  );
};

export default HomePage;
