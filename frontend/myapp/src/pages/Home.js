import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import ProjectForm from '../components/ProjectForm';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const HomePage = ({ fetchProjects }) => (
    <StyledContainer>
        <Typography variant="h4" gutterBottom>
            Home Page
        </Typography>
        <ProjectForm fetchProjects={fetchProjects} />
        <Box mt={2}>
            <Button variant="contained" color="primary" component={Link} to="/projects">
                View Projects
            </Button>
        </Box>
    </StyledContainer>
);

export default HomePage;
