import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import styled from 'styled-components';
import HomePage from './pages/Home';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Navigation from './components/Navigation';
import Signup from './pages/SignUp';
import Settings from './pages/Settings';
import ViewProjects from './pages/ViewProjects';
import { getProjects } from './services/api';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
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
                                    <Route path="/projects" element={<ProjectList />} />
                                    <Route path="/projects/add" element={<ProjectForm fetchProjects={fetchProjects} />} />
                                    <Route path="/projects/:id" element={<ProjectDetails />} />
                                    <Route path="/view-projects" element={<ViewProjects />} />
                                    <Route path="/settings" element={<Settings />} />
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
