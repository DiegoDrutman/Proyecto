// src/pages/Dashboard.js
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import styled from 'styled-components';
import TaskList from '../components/TaskList';
import CollaborationPanel from '../components/CollaborationPanel';
import { useParams } from 'react-router-dom';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  padding: 40px;
  background-color: #f4f6f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
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

const Dashboard = ({ fetchProjects }) => {
    const { id } = useParams();
    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <SectionPaper>
                        <Typography variant="h5" gutterBottom>
                            Task List
                        </Typography>
                        <TaskList projectId={id} />
                    </SectionPaper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SectionPaper>
                        <Typography variant="h5" gutterBottom>
                            Collaboration Panel
                        </Typography>
                        <CollaborationPanel projectId={id} />
                    </SectionPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Dashboard;
