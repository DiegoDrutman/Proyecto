import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import manageProjectsIcon from '../assets/project_management_icon.webp';
import collaborateIcon from '../assets/collaboration_icon.webp';
import stayOrganizedIcon from '../assets/stay_organized_icon.webp';

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
  primary: '#004080',
  secondary: '#2196f3',
  light: '#f5f5f5',
  dark: '#fff',
  accent: 'rgba(0, 0, 0, 0.7)',
};

// Estilo de los componentes
const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;  // Cambiado de height a min-height
  overflow-x: hidden;  // Oculta desplazamiento horizontal
  overflow-y: auto;    // Añadido para permitir desplazamiento vertical solo cuando sea necesario
  background-color: #E5E4E2;
  color: #333;
  text-align: center;
  padding-top: 0px;
  animation: ${fadeIn} 0.5s ease-in-out;
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

const HomePage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <FullScreenContainer>
      <ContentWrapper>
      <Typography
        variant="h2"
        fontSize={70}
        color={colors.secondary}
        sx={{ marginBottom: 1 }} // Ajusta el margen inferior aquí
      >
        TaskWave
      </Typography>
      <Typography
        variant="h3"
        fontSize={45}
        fontStyle="italic"
        sx={{ marginBottom: 2 }} // Ajusta el margen inferior aquí
      >
        Tu Solución Definitiva de Gestión de Proyectos
      </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleButtonClick('/project-creation-wizard')}
          sx={{ mt: 2, mb: 4, px: 4, py: 2, fontSize: '1.2rem' }}
        >
          Crea tu proyecto!
        </Button>
        <FeatureGrid>
          <FeaturePaper>
            <img src={manageProjectsIcon} alt="Manage Projects" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom color={colors.primary}>
              Gestionar Proyectos
            </Typography>
            <Typography variant="body1">
              Crea, actualiza y desarrolla tus proyectos fácilmente con TaskWave. Mantente al tanto de tus plazos y colabora con tu equipo sin inconvenientes.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick('/manage-projects')}
              sx={{ mt: 2 }}
            >
              Gestionar
            </Button>
          </FeaturePaper>

          <FeaturePaper>
            <img src={collaborateIcon} alt="Collaborate Effectively" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom color={colors.primary}>
              Colaboración
            </Typography>
            <Typography variant="body1">
              Trabaja junto a tu equipo en tiempo real. Asigna tareas, monitorea el progreso y logra tus objetivos de manera eficiente.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick('/login')}
              sx={{ mt: 2 }}
            >
              Añadir
            </Button>
          </FeaturePaper>
          <FeaturePaper>
            <img src={stayOrganizedIcon} alt="Stay Organized" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom color={colors.primary}>
              Organización
            </Typography>
            <Typography variant="body1">
              Mantén tus tareas y proyectos organizados. Usa nuestra interfaz intuitiva para gestionar tu flujo de trabajo y aumentar la productividad.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick('/login')}
              sx={{ mt: 2 }}
            >
              Organizar
            </Button>
          </FeaturePaper>
        </FeatureGrid>
        <FeaturePaper mt={4} p={4} bgcolor="rgba(0, 0, 0, 0.7)" borderRadius="10px" width="80%">
          <Typography variant="h5" gutterBottom color="white">
            ¿Por qué TaskWave?
          </Typography>
          <Typography variant="body1" color="white">
            TaskWave está diseñado para simplificar la gestión de proyectos, mejorar la colaboración y aumentar la productividad. Únete a miles de usuarios que han transformado su flujo de trabajo con TaskWave.
          </Typography>
        </FeaturePaper>
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default HomePage;
