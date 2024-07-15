import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import styled from 'styled-components';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './components/ProjectList';
import { getProjects } from './services/api';

const AppContainer = styled(Container)`
  margin-top: 20px;
`;

const App = () => {
    const fetchProjects = async () => {
        try {
            await getProjects();
            // Asigna los datos del proyecto a alguna variable de estado si lo necesitas en el futuro
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <Router>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Project Management App</Typography>
                </Toolbar>
            </AppBar>
            <AppContainer>
                <Routes>
                    <Route path="/" element={<HomePage fetchProjects={fetchProjects} />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/dashboard" element={<Dashboard fetchProjects={fetchProjects} />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AppContainer>
        </Router>
    );
};

export default App;
