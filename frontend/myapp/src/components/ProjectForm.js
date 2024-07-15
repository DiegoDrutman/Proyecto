import React, { useState } from 'react';
import { createProject } from '../services/api';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  max-width: 600px;
  margin-top: 50px;
  text-align: center;
`;

const ProjectForm = ({ fetchProjects }) => {
    const [project, setProject] = useState({ title: '', description: '', start_date: '', end_date: '', user: 1 });
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('success'); // 'success' or 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Creating project:', project);
        try {
            await createProject(project);
            fetchProjects();
            setProject({ title: '', description: '', start_date: '', end_date: '', user: 1 });
            setMessage('Project created successfully!');
            setMessageType('success');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error creating project:', error.response.data);
                setMessage('Error creating project: ' + error.response.data);
            } else {
                console.error('Error creating project:', error.message);
                setMessage('Error creating project: ' + error.message);
            }
            setMessageType('error');
        }
    };

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Create New Project
            </Typography>
            {message && (
                <Alert severity={messageType} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={project.start_date}
                    onChange={(e) => setProject({ ...project, start_date: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={project.end_date}
                    onChange={(e) => setProject({ ...project, end_date: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Add Project
                </Button>
            </Box>
        </StyledContainer>
    );
};

export default ProjectForm;
