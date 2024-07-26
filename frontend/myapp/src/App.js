import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import styled from 'styled-components';
import HomePage from './pages/Home';
import ProjectCreationWizard from './components/ProjectCreationWizard';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import { getProjects } from './services/api';
import PrivateRoute from './components/PrivateRoute';
import Projects from './pages/Projects';
import ManageProjects from './pages/Informative';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  overflow-x: hidden; /* Ocultar desplazamiento horizontal */
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
            <AppContainer>
                <Routes>
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/*"
                        element={
                            <>
                                <Navigation />
                                <Routes>
                                    <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
                                    <Route path="/project-creation-wizard" element={<ProjectCreationWizard />} />
                                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                                        <Route path="/projects" element={<Projects />} />
                                    </Route>
                                    <Route path="/manage-projects" element={<ManageProjects />} />
                                </Routes>
                            </>
                        }
                    />
                </Routes>
            </AppContainer>
        </Router>
    );
};

export default App;
