// src/pages/ViewProjects.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { getProjects } from '../services/api';

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

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Your Projects
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={4}>
                    {projects.map((project) => (
                        <Grid item xs={12} md={4} key={project.id}>
                            <SectionPaper>
                                <Typography variant="h5" gutterBottom>
                                    {project.title}
                                </Typography>
                                <Typography variant="body1">
                                    {project.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {`Start Date: ${project.start_date}`}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {`End Date: ${project.end_date}`}
                                </Typography>
                            </SectionPaper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </StyledContainer>
    );
};

export default ViewProjects;
