// src/components/ProjectList.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const ProjectList = () => {
    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Projects
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/projects/add">
                Add Project
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/view-projects" sx={{ ml: 2 }}>
                View Projects
            </Button>
        </StyledContainer>
    );
};

export default ProjectList;
