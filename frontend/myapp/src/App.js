import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import styled from 'styled-components';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Navigation from './components/Navigation';
import { getProjects } from './services/api';
import PrivateRoute from './components/PrivateRoute';

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
            <Navigation isAuthenticated={isAuthenticated} />
            <AppContainer>
                <Routes>
                    <Route path="/" element={<HomePage fetchProjects={fetchProjects} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/projects" element={<PrivateRoute isAuthenticated={isAuthenticated}><ProjectList /></PrivateRoute>} />
                    <Route path="/projects/add" element={<PrivateRoute isAuthenticated={isAuthenticated}><ProjectForm fetchProjects={fetchProjects} /></PrivateRoute>} />
                    <Route path="/projects/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><ProjectDetails /></PrivateRoute>} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </AppContainer>
        </Router>
    );
};

export default App;
