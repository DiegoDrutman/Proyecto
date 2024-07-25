import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import manageProjectsIcon from '../assets/project_management_icon.webp';
import collaborateIcon from '../assets/collaboration_icon.webp';
import stayOrganizedIcon from '../assets/stay_organized_icon.webp';

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Cambiar a flex-start para que el contenido comience desde arriba */
  align-items: center;
  width: 100vw;
  height: 150vh;
  background-color: #E5E4E2;
  color: #333;
  text-align: center;
  padding-top: 30px; /* Ajuste para evitar la superposición con el navbar */
`;

const ContentWrapper = styled(Box)`
  display: grid;
  gap: 10px;
  justify-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 40px 20px;
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
  padding: 10px;
  border-radius: 10px;
  color: #333;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
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
        <Typography variant="h2" gutterBottom>
          Bienvenido a TaskWave
        </Typography>
        <Typography variant="h6" gutterBottom>
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
            <Typography variant="h4" gutterBottom>
              Gestionar Proyectos
            </Typography>
            <Typography variant="body1">
              Crea, actualiza y desarrolla tus proyectos fácilmente con TaskWave. Mantente al tanto de tus plazos y colabora con tu equipo sin inconvenientes.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick('/login')}
              sx={{ mt: 2 }}
            >
              Mis Proyectos
            </Button>
          </FeaturePaper>

          <FeaturePaper>
            <img src={collaborateIcon} alt="Collaborate Effectively" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom>
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
              Colaboradores
            </Button>
          </FeaturePaper>

          <FeaturePaper>
            <img src={stayOrganizedIcon} alt="Stay Organized" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom>
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
              Mis Tareas
            </Button>
          </FeaturePaper>
        </FeatureGrid>

        <Box mt={4} p={4} bgcolor="rgba(0, 0, 0, 0.7)" borderRadius="10px" width="80%">
          <Typography variant="h5" gutterBottom color="white">
            ¿Por qué TaskWave?
          </Typography>
          <Typography variant="body1" color="white">
            TaskWave está diseñado para simplificar la gestión de proyectos, mejorar la colaboración y aumentar la productividad. Únete a miles de usuarios que han transformado su flujo de trabajo con TaskWave.
          </Typography>
        </Box>
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default HomePage;
