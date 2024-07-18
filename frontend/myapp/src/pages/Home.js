import React from 'react';
import { Typography, Container, Grid, Paper, Button, Box } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import complementaryBackgroundImage from '../assets/background.webp'; // Imagen de fondo complementaria
import manageProjectsIcon from '../assets/project_management_icon.webp';
import collaborateIcon from '../assets/collaboration_icon.webp';
import stayOrganizedIcon from '../assets/stay_organized_icon.webp';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
  background-color: #f4f6f8;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SectionPaper = styled(Paper)`
  padding: 20px;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const FeatureBox = styled(Box)`
  background-image: url(${complementaryBackgroundImage});
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  position: relative;
`;

const FeatureBoxContent = styled(Box)`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  display: inline-block;
`;

const HomePage = ({ fetchProjects, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h2" gutterBottom>
        Welcome to TaskWave
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Ultimate Project Management Solution
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick('/projects/add')}
        sx={{ mt: 2, mb: 4 }}
      >
        Get Started
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <SectionPaper>
            <img src={manageProjectsIcon} alt="Manage Projects" style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h4" gutterBottom>
              Manage Projects
            </Typography>
            <Typography variant="body1">
              Easily create, update, and track your projects with TaskWave. Stay on top of your deadlines and collaborate with your team seamlessly.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleButtonClick('/projects')}
              sx={{ mt: 2 }}
            >
              View Projects
            </Button>
          </SectionPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionPaper>
            <img src={collaborateIcon} alt="Collaborate Effectively" style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h4" gutterBottom>
              Collaborate Effectively
            </Typography>
            <Typography variant="body1">
              Work together with your team in real-time. Assign tasks, monitor progress, and achieve your goals efficiently.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleButtonClick('/collaborations')}
              sx={{ mt: 2 }}
            >
              Collaborations
            </Button>
          </SectionPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionPaper>
            <img src={stayOrganizedIcon} alt="Stay Organized" style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h4" gutterBottom>
              Stay Organized
            </Typography>
            <Typography variant="body1">
              Keep your tasks and projects organized. Use our intuitive interface to manage your workflow and increase productivity.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleButtonClick('/tasks')}
              sx={{ mt: 2 }}
            >
              View Tasks
            </Button>
          </SectionPaper>
        </Grid>
      </Grid>

      <FeatureBox mt={4}>
        <FeatureBoxContent>
          <Typography variant="h6" gutterBottom>
            Why TaskWave?
          </Typography>
          <Typography variant="body1">
            TaskWave is designed to simplify project management, enhance collaboration, and boost productivity. Join thousands of users who have transformed their workflow with TaskWave.
          </Typography>
        </FeatureBoxContent>
      </FeatureBox>
    </StyledContainer>
  );
};

export default HomePage;
