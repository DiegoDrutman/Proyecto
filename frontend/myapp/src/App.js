import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import styled from 'styled-components';
import HomePage from './pages/Home';
import DocumentUpload from './pages/DocumentUpload';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import { getDocuments } from './services/api';  // Cambiado de getProjects a getDocuments
import PrivateRoute from './components/PrivateRoute';
import DocumentList from './pages/DocumentList';
import DocumentReview from './pages/DocumentReview';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  overflow-x: hidden;  // Ocultar desplazamiento horizontal
`;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchDocuments = async () => {
        try {
            await getDocuments();  // Cambiado de getProjects a getDocuments
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <Router>
            <CssBaseline />
            <AppContainer>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
                    <Route path="/document-upload" element={<DocumentUpload />} />
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/document-list" element={<DocumentList />} />
                        <Route path="/document-review/:id" element={<DocumentReview />} />
                    </Route>
                </Routes>
            </AppContainer>
        </Router>
    );
};

export default App;
