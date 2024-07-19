// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import styled from 'styled-components';
import HomePage from './pages/Home';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Navigation from './components/Navigation';
import Signup from './pages/SignUp';
import Settings from './pages/Settings'; // Importar la página de configuración
import { getProjects } from './services/api';

const AppContainer = styled(Container)`
  margin-top: 20px;
`;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchProjects = async () => {
        try {
            await getProjects();
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
            <Navigation />
            <AppContainer>
                <Routes>
                    <Route path="/" element={<HomePage fetchProjects={fetchProjects} />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/projects/add" element={<ProjectForm fetchProjects={fetchProjects} />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/settings" element={<Settings />} /> {/* Nueva ruta de configuración */}
                </Routes>
            </AppContainer>
        </Router>
    );
};

export default App;
