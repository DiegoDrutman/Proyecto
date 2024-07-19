import React from 'react';
import { Button, Container, Typography, Grid, Paper, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import addProjectIcon from '../assets/add_project_icon.webp'; // Icono de añadir proyecto
import viewProjectsIcon from '../assets/view_projects_icon.webp'; // Icono de ver proyectos

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
  text-align: center;
`;

const IconBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const DescriptionBox = styled(Box)`
  text-align: left;
  padding: 20px;
`;

const StatisticsBox = styled(Box)`
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const ProjectList = () => {
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Divider />
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <SectionPaper>
            <IconBox>
              <img src={addProjectIcon} alt="Add Project" style={{ width: '50%', height: 'auto' }} />
            </IconBox>
            <Typography variant="h5" gutterBottom>
              Add Project
            </Typography>
            <DescriptionBox>
              <Typography variant="body1">
                Start a new project and manage your tasks efficiently.
              </Typography>
            </DescriptionBox>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/projects/add"
              sx={{ mt: 2 }}
            >
              Add Project
            </Button>
          </SectionPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionPaper>
            <IconBox>
              <img src={viewProjectsIcon} alt="View Projects" style={{ width: '50%', height: 'auto' }} />
            </IconBox>
            <Typography variant="h5" gutterBottom>
              View Projects
            </Typography>
            <DescriptionBox>
              <Typography variant="body1">
                See all your ongoing projects and track progress.
              </Typography>
            </DescriptionBox>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/view-projects"
              sx={{ mt: 2 }}
            >
              View Projects
            </Button>
          </SectionPaper>
        </Grid>
      </Grid>

      <StatisticsBox>
        <Typography variant="h6" gutterBottom>
          Project Statistics
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4">15</Typography>
              <Typography variant="body1">Active Projects</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4">10</Typography>
              <Typography variant="body1">Completed Projects</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4">5</Typography>
              <Typography variant="body1">Pending Projects</Typography>
            </Paper>
          </Grid>
        </Grid>
      </StatisticsBox>

      <Divider sx={{ marginY: 4 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="body1">
            You have 3 new tasks assigned today. Your project "Website Redesign" is nearing its deadline.
          </Typography>
        </Paper>
      </Box>
    </StyledContainer>
  );
};

export default ProjectList;
