// src/pages/ViewProjects.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { getProjects } from '../services/api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response);
                setLoading(false);
            } catch (error) {
                setError('Error fetching projects.');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Projects
            </Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <List>
                {projects.map((project) => (
                    <ListItem key={project.id} button component={Link} to={`/projects/${project.id}`}>
                        <ListItemText primary={project.title} secondary={project.description} />
                    </ListItem>
                ))}
            </List>
        </StyledContainer>
    );
};

export default ViewProjects;
