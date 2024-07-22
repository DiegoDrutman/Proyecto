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
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #E5E4E2;
  color: #333;
  text-align: center;
`;

const ContentWrapper = styled(Box)`
  display: grid;
  gap: 20px;
  justify-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 40px 20px;
`;

const FeatureGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
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
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const HomePage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h2" gutterBottom>
          Welcome to TaskWave
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your Ultimate Project Management Solution
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleButtonClick('/projects/add')}
          sx={{ mt: 2, mb: 4, px: 4, py: 2, fontSize: '1.2rem' }}
        >
          Get Started
        </Button>

        <FeatureGrid>
          <FeaturePaper>
            <img src={manageProjectsIcon} alt="Manage Projects" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom>
              Manage Projects
            </Typography>
            <Typography variant="body1">
              Easily create, update, and track your projects with TaskWave. Stay on top of your deadlines and collaborate with your team seamlessly.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick('/projects')}
              sx={{ mt: 2 }}
            >
              View Projects
            </Button>
          </FeaturePaper>

          <FeaturePaper>
            <img src={collaborateIcon} alt="Collaborate Effectively" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom>
              Collaborate Effectively
            </Typography>
            <Typography variant="body1">
              Work together with your team in real-time. Assign tasks, monitor progress, and achieve your goals efficiently.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick('/collaborations')}
              sx={{ mt: 2 }}
            >
              Collaborations
            </Button>
          </FeaturePaper>

          <FeaturePaper>
            <img src={stayOrganizedIcon} alt="Stay Organized" style={{ width: '100px', height: '100px' }} />
            <Typography variant="h4" gutterBottom>
              Stay Organized
            </Typography>
            <Typography variant="body1">
              Keep your tasks and projects organized. Use our intuitive interface to manage your workflow and increase productivity.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick('/tasks')}
              sx={{ mt: 2 }}
            >
              View Tasks
            </Button>
          </FeaturePaper>
        </FeatureGrid>

        <Box mt={4} p={4} bgcolor="rgba(0, 0, 0, 0.7)" borderRadius="10px" width="80%">
          <Typography variant="h5" gutterBottom color="white">
            Why TaskWave?
          </Typography>
          <Typography variant="body1" color="white">
            TaskWave is designed to simplify project management, enhance collaboration, and boost productivity. Join thousands of users who have transformed their workflow with TaskWave.
          </Typography>
        </Box>
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default HomePage;
