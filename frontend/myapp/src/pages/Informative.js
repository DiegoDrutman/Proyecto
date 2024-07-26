import React from 'react';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { keyframes } from 'styled-components';

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
  primary: '#004080', // Color vibrante
  secondary: '#2196f3', // Color complementario
  light: '#f5f5f5',
  dark: '#fff',
  accent: '#rgba(0, 0, 0, 0.7)', // Color de acento
};

// Estilo de los componentes
const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Cambiar a flex-start para que el contenido comience desde arriba */
  align-items: center;
  width: 100vw;
  height: 100vh; /* Ajuste la altura al 100% del viewport */
  overflow-x: hidden; /* Ocultar el desplazamiento horizontal */
  background-color: #E5E4E2;
  color: #333;
  text-align: center;
  padding-top: 30px; /* Ajuste para evitar la superposición con el navbar */
`;

const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
  padding: 60px 20px;
  background-color: ${props => props.bgColor || '#fff'};
  margin-bottom: -80px; /* Reduce el margen inferior aquí */
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
  font-weight: bold;
  color: ${colors.primary};
  font-size: 2.5rem;
`;

const Subtitle = styled(Typography)`
  margin-bottom: 20px;
  color: ${colors.secondary};
  font-size: 1.2rem;
`;

const StyledButton = styled(Button)`
  background-color: ${colors.primary};
  color: #fff;
  &:hover {
    background-color: ${colors.secondary};
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InformativePage = () => {
  const navigate = useNavigate();

  return (
    <FullScreenContainer>
      {/* Sección de Bienvenida */}
        <Title variant="h2">¿Proyectos?</Title>
        <Subtitle variant="h6">
          Transformalos en realidad usando TaskWave.
        </Subtitle>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={() => navigate('/signup')}
          sx={{ mt: 2, mb: 4, px: 4, py: 2, fontSize: '1.2rem' }}
        >
          Empieza Gratis
        </StyledButton>

      {/* Beneficios del Servicio */}
      <Section bgColor={colors.accent}>
        <Grid container spacing={4}>
          {[
            {
              title: 'Gestión Integral',
              description: 'Administra todos tus proyectos desde una sola plataforma, con herramientas integradas para seguimiento y control.',
              image: 'https://via.placeholder.com/600x400?text=Gestión+Integral',
            },
            {
              title: 'Colaboración Eficiente',
              description: 'Facilita la colaboración entre equipos con comunicación en tiempo real y asignación de tareas.',
              image: 'https://via.placeholder.com/600x400?text=Colaboración+Eficiente',
            },
            {
              title: 'Automatización',
              description: 'Automatiza procesos repetitivos y ahorra tiempo con nuestras herramientas de automatización.',
              image: 'https://via.placeholder.com/600x400?text=Automatización',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <Image src={item.image} alt={item.title} />
                <Typography variant="h6" color={colors.primary} sx={{ marginTop: '20px' }}>{item.title}</Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Estadísticas y Métricas */}
      <Section bgColor={colors.accent}>
        <Title variant="h4">Estadísticas y Métricas</Title>
        <Typography variant="body1" sx={{ maxWidth: '800px', margin: '0 auto' }}>
          Con TaskWave, puedes monitorizar el progreso de tus proyectos en tiempo real y obtener informes detallados para tomar decisiones informadas.
        </Typography>
        <Box sx={{ width: '100%', height: '300px', marginTop: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          {/* Aquí puedes insertar gráficos interactivos usando librerías como recharts */}
        </Box>
      </Section>
    </FullScreenContainer>
  );
};

export default InformativePage;