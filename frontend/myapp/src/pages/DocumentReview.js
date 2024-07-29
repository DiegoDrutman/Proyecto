import React from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
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
  primary: '#004080',  // Color vibrante
  secondary: '#2196f3',  // Color complementario
  light: '#f5f5f5',
  dark: '#fff',
  accent: '#rgba(0, 0, 0, 0.7)',  // Color de acento
};

// Estilo de los componentes
const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: #fff;
  color: #333;
  text-align: center;
  padding-top: 30px;
`;

const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  padding: 60px 20px;
  background-color: ${props => props.bgColor || '#fff'};
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
  font-weight: bold;
  color: ${colors.primary};
  font-size: 2.5rem;
`;

const StyledButton = styled(Button)`
  background-color: ${colors.primary};
  color: #fff;
  &:hover {
    background-color: ${colors.secondary};
  }
`;

const DocumentReview = () => {
  const navigate = useNavigate();

  return (
    <FullScreenContainer>
      {/* Document Review Section */}
      <Section>
        <Title variant="h2">Document Review</Title>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Review and annotate your documents effectively.
        </Typography>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={() => navigate('/document-annotate')}
          sx={{ mt: 2, mb: 4, px: 4, py: 2, fontSize: '1.2rem' }}
        >
          Annotate Document
        </StyledButton>
      </Section>

      {/* Document Interaction Section */}
      <Section bgColor={colors.light}>
        <Typography variant="h4" color={colors.primary}>Interact with Document</Typography>
        <Typography variant="body2" sx={{ maxWidth: '800px', margin: '0 auto', marginBottom: 2 }}>
          Here you can collaborate with others, leave comments, and save changes.
        </Typography>
        <Box sx={{ width: '100%', padding: 2 }}>
          {/* Placeholder for interactive document display or tools */}
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography>Document content goes here. (Placeholder)</Typography>
          </Paper>
        </Box>
      </Section>
    </FullScreenContainer>
  );
};

export default DocumentReview;
