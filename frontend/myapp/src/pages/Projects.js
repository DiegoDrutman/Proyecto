import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material';
import { getProjects } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const FullScreenContainer = styled(Box)`
  display: flex;
  height: 100vh;
  background-color: #E5E4E2;
  color: #333;
  overflow: hidden; /* Evita el desbordamiento horizontal */
`;

const Sidebar = styled(Box)`
  width: 250px;
  height: 100vh; /* Asegura que el sidebar ocupe toda la altura de la ventana */
  background-color: #004080;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  position: fixed; /* Mantiene el sidebar fijo en su posición */
  top: 0;
  left: 0;
`;

const LogoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const Logo = styled('img')`
  height: 50px;
  margin-right: 10px;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 250px); /* Ajusta el ancho para que no se desborde */
  padding: 40px 20px;
  margin-left: 250px;
  overflow: auto; /* Permite el desplazamiento vertical si es necesario */
`;

const FeaturePaper = styled(Box)`
  background-color: #f0f0f0;
  padding: 50px;
  border-radius: 10px;
  color: #333;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response);
        setLoading(false);
      } catch (error) {
        setError('Failed to load projects.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <FullScreenContainer>
      <Sidebar>
        <LogoWrapper>
          <Logo src={logo} alt="TaskWave Logo" />
          <Typography variant="h4" sx={{ color: '#fff', '@media (max-width: 600px)': { fontSize: '1.5rem' } }}>
            TaskWave
          </Typography>
        </LogoWrapper>
        <List>
          <ListItem button onClick={() => navigate('/projects')}>
            <ListItemText primary="Proyectos" />
          </ListItem>
          <ListItem button onClick={() => navigate('/tasks')}>
            <ListItemText primary="Tareas" />
          </ListItem>
          <ListItem button onClick={() => navigate('/collaborators')}>
            <ListItemText primary="Colaboradores" />
          </ListItem>
        </List>
      </Sidebar>
      <ContentWrapper>
        <Typography variant="h2" gutterBottom>Mis Proyectos</Typography>
        <Button variant="contained" color="secondary" onClick={() => handleButtonClick('/project-creation-wizard')} sx={{ mt: 2, mb: 4, px: 4, py: 2, fontSize: '1.2rem' }}>Agregar Proyecto</Button>
        {projects.length === 0 ? (
          <Typography variant="h6">No tienes proyectos.</Typography>
        ) : (
          <Box width="100%">
            {projects.map((project) => (
              <FeaturePaper key={project.id} mb={2}>
                <Typography variant="h4" gutterBottom>{project.name}</Typography>
                <Typography variant="body1">{project.description}</Typography>
                <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={() => navigate(`/projects/${project.id}`)}>
                  Ver Proyecto
                </Button>
              </FeaturePaper>
            ))}
          </Box>
        )}
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default Projects;
