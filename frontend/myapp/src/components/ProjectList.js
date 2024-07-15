import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response || []);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Projects
            </Typography>
            <List>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ListItem key={project.id} button component={Link} to={`/projects/${project.id}`}>
                            <ListItemText primary={project.title} secondary={project.description} />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1">No projects found.</Typography>
                )}
            </List>
        </StyledContainer>
    );
};

export default ProjectList;
