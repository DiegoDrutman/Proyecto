// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import styled from 'styled-components';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Navigation from './components/Navigation';
import ViewProjects from './components/ViewProjects';  // Importa el componente ViewProjects
import { getProjects } from './services/api';

const AppContainer = styled(Container)`
  margin-top: 20px;
`;

const App = () => {
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
          <Route path="/view-projects" element={<ViewProjects />} />  {/* Configura la ruta para ViewProjects */}
          <Route path="/dashboard" element={<Dashboard fetchProjects={fetchProjects} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
