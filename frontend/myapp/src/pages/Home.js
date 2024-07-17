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
    </StyledContainer>
);

export default HomePage;
